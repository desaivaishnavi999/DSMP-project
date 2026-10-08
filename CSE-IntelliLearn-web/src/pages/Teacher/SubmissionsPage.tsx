import React, { useState } from "react";
import { CheckSquare, Download, CheckCircle, Clock } from "lucide-react";
import { toast } from "sonner";
import { useAuthStore } from "@/store/useAuthStore";
import type { Submission } from "@/types";

export default function SubmissionsPage() {
  const user = useAuthStore((s) => s.user);
  const userName = user?.name ?? "Teacher";

  const [submissions, setSubmissions] = useState<Submission[]>([
    {
      id: "1",
      studentName: "Alex Student",
      rollNumber: "1CS21045",
      assignmentTitle: "Assignment 2: SQL Query Optimization",
      submittedOn: "2026-10-05",
      status: "Pending Grade",
    },
    {
      id: "2",
      studentName: "Rohan Kumar",
      rollNumber: "1CS21088",
      assignmentTitle: "Assignment 2: SQL Query Optimization",
      submittedOn: "2026-10-04",
      status: "Graded",
      grade: "A (90/100)",
    },
  ]);

  const [gradingId, setGradingId] = useState<string | null>(null);
  const [gradeInput, setGradeInput] = useState("");

  const handleSaveGrade = (id: string) => {
    if (!gradeInput) return;
    setSubmissions((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, status: "Graded", grade: gradeInput } : item
      )
    );
    toast.success("Grade assigned successfully!");
    setGradingId(null);
    setGradeInput("");
  };

  return (
    <div className="min-h-screen bg-surface text-secondary font-sans flex flex-col">
      
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white p-[30px] rounded-[18px] shadow-[0_5px_20px_rgba(30,64,175,0.08)] mb-[30px] border-l-[5px] border-primary">
          <h1 className="text-[30px] font-bold text-secondary m-0 flex items-center gap-3">
            <CheckSquare className="w-8 h-8 text-primary" />
            Student Assignment Submissions
          </h1>
          <p className="mt-[10px] text-[#64748b] text-[16px] mb-0">
            Review uploaded student work, download submission files, and assign grades
          </p>
        </div>

        <div className="space-y-4">
          {submissions.map((sub) => (
            <div
              key={sub.id}
              className="bg-white border border-[#e1eaf8] shadow-[0_5px_20px_rgba(30,64,175,0.08)] rounded-[18px] p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 transition-all hover:-translate-y-1 hover:shadow-[0_10px_28px_rgba(30,64,175,0.15)]"
            >
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-[13px] font-bold px-3 py-1 rounded-md bg-primary-light text-primary">
                    {sub.rollNumber}
                  </span>
                  <h3 className="text-[18px] font-bold text-secondary m-0">{sub.studentName}</h3>
                </div>
                <p className="text-[15px] font-bold text-primary m-0 mt-1">{sub.assignmentTitle}</p>
                <p className="text-[13px] text-[#64748b] mt-1 mb-0">Submitted on {sub.submittedOn}</p>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={() => alert(`Downloading file for ${sub.studentName}`)}
                  className="px-4 py-2.5 rounded-xl bg-[#f8fafc] hover:bg-[#f1f5f9] text-[#64748b] text-[14px] font-bold flex items-center gap-2 border border-[#e2e8f0] transition-colors cursor-pointer"
                >
                  <Download className="w-4 h-4" />
                  View File
                </button>

                {sub.status === "Graded" ? (
                  <span className="px-4 py-2 rounded-xl bg-[#d1ecf1] text-[#0c5460] text-[14px] font-bold">
                    Graded: {sub.grade}
                  </span>
                ) : gradingId === sub.id ? (
                  <div className="flex items-center gap-2">
                    <input
                      type="text"
                      placeholder="e.g. A (95/100)"
                      value={gradeInput}
                      onChange={(e) => setGradeInput(e.target.value)}
                      className="px-4 py-2 bg-white border border-[#cbd5e1] rounded-xl text-[14px] text-secondary placeholder:text-slate-400 focus:outline-none focus:border-primary"
                    />
                    <button
                      onClick={() => handleSaveGrade(sub.id)}
                      className="px-4 py-2 bg-primary hover:bg-blue-700 text-white text-[14px] font-bold rounded-xl border-none cursor-pointer shadow-[0_4px_10px_rgba(37,99,235,0.2)]"
                    >
                      Save
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => setGradingId(sub.id)}
                    className="px-5 py-2.5 rounded-xl bg-primary hover:bg-blue-700 text-white text-[14px] font-bold transition-all cursor-pointer border-none shadow-[0_4px_10px_rgba(37,99,235,0.2)]"
                  >
                    Assign Grade
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
