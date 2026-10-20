import React, { useState } from "react";
import { useAuthStore } from "@/store/useAuthStore";
import { FilePlus } from "lucide-react";
import { toast } from "sonner";
import { useCreateAssignment, useAllSubjects } from "@/hooks";

export default function CreateAssignmentPage() {
  const user = useAuthStore((state) => state.user);

  const [title, setTitle] = useState("");
  const [subject, setSubject] = useState(""); // subjectId
  const [dueDate, setDueDate] = useState("");
  const [description, setDescription] = useState("");

  const { data: subjects = [], isLoading: loadingSubjects } = useAllSubjects();
  const { mutate: createAssignment, isPending } = useCreateAssignment();

  const handleCreateAssignment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !subject || !dueDate || !description) {
      toast.error("Please fill in all details and select a subject for the assignment.");
      return;
    }

    const formattedDueDate = dueDate.includes("T") ? dueDate : `${dueDate}T23:59:59`;

    createAssignment(
      {
        title,
        description,
        subjectId: Number(subject),
        teacherId: user?.id ?? 1,
        dueDate: formattedDueDate,
      },
      {
        onSuccess: () => {
          setTitle("");
          setSubject("");
          setDueDate("");
          setDescription("");
        },
      }
    );
  };

  return (
    <div className="min-h-screen bg-surface text-secondary font-sans flex flex-col">
      <main className="flex-1 max-w-4xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white p-[30px] rounded-[18px] shadow-[0_5px_20px_rgba(30,64,175,0.08)] mb-[30px] border-l-[5px] border-primary">
          <h1 className="text-[30px] font-bold text-secondary m-0 flex items-center gap-3">
            <FilePlus className="w-8 h-8 text-primary" />
            Create New Assignment
          </h1>
          <p className="mt-[10px] text-[#64748b] text-[16px] mb-0">
            Publish academic assignments, problem statements, and submission deadlines
          </p>
        </div>

        <div className="bg-white border border-[#e1eaf8] shadow-[0_5px_20px_rgba(30,64,175,0.08)] rounded-[18px] p-[30px]">
          <form onSubmit={handleCreateAssignment} className="space-y-6">
            <div>
              <label className="block text-[14px] font-bold text-secondary mb-2">
                Assignment Title
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. Assignment 4: Binary Search Tree Operations"
                required
                className="w-full px-4 py-3 bg-white border border-[#cbd5e1] rounded-xl text-secondary placeholder:text-slate-400 text-[15px] focus:outline-none focus:border-primary"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-[14px] font-bold text-secondary mb-2">
                  Course / Subject
                </label>
                <select
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  required
                  className="w-full px-4 py-3 bg-white border border-[#cbd5e1] rounded-xl text-secondary text-[15px] focus:outline-none focus:border-primary"
                >
                  <option value="">{loadingSubjects ? "Loading subjects..." : "Select Subject"}</option>
                  {subjects.map((s: any) => (
                    <option key={s.subjectId} value={s.subjectId}>
                      {s.subjectName} {s.subjectCode ? `(${s.subjectCode})` : ""}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-[14px] font-bold text-secondary mb-2">
                  Submission Deadline
                </label>
                <input
                  type="date"
                  value={dueDate}
                  onChange={(e) => setDueDate(e.target.value)}
                  required
                  className="w-full px-4 py-3 bg-white border border-[#cbd5e1] rounded-xl text-secondary text-[15px] focus:outline-none focus:border-primary"
                />
              </div>
            </div>

            <div>
              <label className="block text-[14px] font-bold text-secondary mb-2">
                Problem Statement & Instructions
              </label>
              <textarea
                rows={5}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Provide details, problem specifications, and grading criteria..."
                required
                className="w-full px-4 py-3 bg-white border border-[#cbd5e1] rounded-xl text-secondary placeholder:text-slate-400 text-[15px] focus:outline-none focus:border-primary"
              />
            </div>

            <button
              type="submit"
              disabled={isPending}
              className="w-full py-4 bg-primary hover:bg-blue-700 text-white font-bold rounded-xl shadow-[0_4px_10px_rgba(37,99,235,0.2)] text-[15px] transition-all cursor-pointer border-none disabled:opacity-50"
            >
              {isPending ? "Publishing Assignment..." : "Publish Assignment"}
            </button>
          </form>
        </div>
      </main>
    </div>
  );
}
