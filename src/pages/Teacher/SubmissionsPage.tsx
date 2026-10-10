import React, { useState } from "react";
import { CheckSquare, Download } from "lucide-react";
import { useAuthStore } from "@/store/useAuthStore";
import { useSubmissionsByAssignment, useAddFeedback } from "@/hooks";

export default function SubmissionsPage() {
  const user = useAuthStore((s) => s.user);

  const { data: submissions = [], isLoading } = useSubmissionsByAssignment(1); // Assignment 1
  const { mutate: addFeedback, isPending } = useAddFeedback();

  const [gradingId, setGradingId] = useState<number | string | null>(null);
  const [marksInput, setMarksInput] = useState("");
  const [feedbackInput, setFeedbackInput] = useState("");

  const handleSaveGrade = (submissionId: number | string) => {
    if (!marksInput) return;

    addFeedback(
      {
        submissionId,
        teacherId: user?.id ?? 1,
        marks: Number(marksInput) || 90,
        feedbackText: feedbackInput || "Good submission",
      },
      {
        onSuccess: () => {
          setGradingId(null);
          setMarksInput("");
          setFeedbackInput("");
        },
      }
    );
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
          {isLoading ? (
            <div className="p-8 text-center text-slate-500 font-bold bg-white rounded-2xl border">Loading submissions...</div>
          ) : submissions.length === 0 ? (
            <div className="p-12 text-center text-slate-500 bg-white rounded-2xl border">
              No submissions uploaded yet for this assignment.
            </div>
          ) : (
            submissions.map((sub: any) => (
              <div
                key={sub.submissionId}
                className="bg-white border border-[#e1eaf8] shadow-[0_5px_20px_rgba(30,64,175,0.08)] rounded-[18px] p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 transition-all hover:-translate-y-1 hover:shadow-[0_10px_28px_rgba(30,64,175,0.15)]"
              >
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-[13px] font-bold px-3 py-1 rounded-md bg-primary-light text-primary">
                      Student ID: {sub.studentId}
                    </span>
                  </div>
                  <p className="text-[15px] font-bold text-primary m-0 mt-1">
                    File: {sub.fileName || "Assignment_Report.pdf"}
                  </p>
                  <p className="text-[13px] text-[#64748b] mt-1 mb-0">
                    Status: <span className="font-bold text-slate-700">{sub.status}</span>
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  <button
                    onClick={() => alert(`Opening submission file: ${sub.fileName || 'Solution.pdf'}`)}
                    className="px-4 py-2.5 rounded-xl bg-[#f8fafc] hover:bg-[#f1f5f9] text-[#64748b] text-[14px] font-bold flex items-center gap-2 border border-[#e2e8f0] transition-colors cursor-pointer"
                  >
                    <Download className="w-4 h-4" />
                    View File
                  </button>

                  {sub.status === "Checked" ? (
                    <span className="px-4 py-2 rounded-xl bg-[#d1ecf1] text-[#0c5460] text-[14px] font-bold">
                      Graded & Checked
                    </span>
                  ) : gradingId === sub.submissionId ? (
                    <div className="flex items-center gap-2">
                      <input
                        type="number"
                        placeholder="Marks (e.g. 95)"
                        value={marksInput}
                        onChange={(e) => setMarksInput(e.target.value)}
                        className="w-28 px-3 py-2 bg-white border border-[#cbd5e1] rounded-xl text-[14px] text-secondary placeholder:text-slate-400 focus:outline-none focus:border-primary"
                      />
                      <input
                        type="text"
                        placeholder="Feedback comment"
                        value={feedbackInput}
                        onChange={(e) => setFeedbackInput(e.target.value)}
                        className="px-3 py-2 bg-white border border-[#cbd5e1] rounded-xl text-[14px] text-secondary placeholder:text-slate-400 focus:outline-none focus:border-primary"
                      />
                      <button
                        onClick={() => handleSaveGrade(sub.submissionId)}
                        disabled={isPending}
                        className="px-4 py-2 bg-primary hover:bg-blue-700 text-white text-[14px] font-bold rounded-xl border-none cursor-pointer shadow-[0_4px_10px_rgba(37,99,235,0.2)] disabled:opacity-50"
                      >
                        {isPending ? "Saving..." : "Save"}
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={() => setGradingId(sub.submissionId)}
                      className="px-5 py-2.5 rounded-xl bg-primary hover:bg-blue-700 text-white text-[14px] font-bold transition-all cursor-pointer border-none shadow-[0_4px_10px_rgba(37,99,235,0.2)]"
                    >
                      Assign Grade & Feedback
                    </button>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      </main>
    </div>
  );
}
