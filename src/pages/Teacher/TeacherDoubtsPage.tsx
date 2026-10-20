import React, { useState } from "react";
import { HelpCircle, Send, CheckCircle2, BookOpen } from "lucide-react";
import { useAuthStore } from "@/store/useAuthStore";
import { useDoubts, useAnswerDoubt, useAllSubjects } from "@/hooks";

export default function TeacherDoubtsPage() {
  const user = useAuthStore((s) => s.user);

  const { data: doubts = [], isLoading } = useDoubts();
  const { data: allSubjects = [] } = useAllSubjects();
  const { mutate: answerDoubt, isPending } = useAnswerDoubt();

  const getSubjectName = (subjectId?: number | string) => {
    if (!subjectId) return null;
    const match = allSubjects.find((s: any) => String(s.subjectId) === String(subjectId));
    return match ? `${match.subjectCode ? match.subjectCode + " - " : ""}${match.subjectName}` : `Subject #${subjectId}`;
  };

  const [activeDoubtId, setActiveDoubtId] = useState<number | string | null>(null);
  const [answerInput, setAnswerInput] = useState("");

  const handlePostAnswer = (doubtId: number | string) => {
    if (!answerInput.trim()) return;

    answerDoubt(
      {
        doubtId,
        teacherId: user?.id ?? 1,
        answer: answerInput,
      },
      {
        onSuccess: () => {
          setActiveDoubtId(null);
          setAnswerInput("");
        },
      }
    );
  };

  return (
    <div className="min-h-screen bg-surface text-secondary font-sans flex flex-col">
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white p-[30px] rounded-[18px] shadow-[0_5px_20px_rgba(30,64,175,0.08)] mb-[30px] border-l-[5px] border-primary">
          <h1 className="text-[30px] font-bold text-secondary m-0 flex items-center gap-3">
            <HelpCircle className="w-8 h-8 text-primary" />
            Resolve Student Doubts
          </h1>
          <p className="mt-[10px] text-[#64748b] text-[16px] mb-0">
            Answer questions asked by students across your department courses
          </p>
        </div>

        <div className="space-y-4">
          {isLoading ? (
            <div className="p-8 text-center text-slate-500 font-bold bg-white rounded-2xl border">Loading doubts...</div>
          ) : doubts.length === 0 ? (
            <div className="p-12 text-center text-slate-500 bg-white rounded-2xl border">
              No student doubts pending. All caught up!
            </div>
          ) : (
            doubts.map((item: any) => (
              <div key={item.doubtId} className="bg-white border border-[#e1eaf8] shadow-[0_5px_20px_rgba(30,64,175,0.08)] rounded-[18px] p-6 transition-all hover:-translate-y-1 hover:shadow-[0_10px_28px_rgba(30,64,175,0.15)]">
                <div className="flex items-center justify-between mb-3 flex-wrap gap-2">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-[13px] font-bold px-3 py-1 rounded-md bg-primary-light text-primary">
                      {item.title}
                    </span>
                    {getSubjectName(item.subjectId) && (
                      <span className="text-[12px] font-bold px-3 py-1 rounded-md bg-indigo-50 text-indigo-700 border border-indigo-100 flex items-center gap-1">
                        <BookOpen className="w-3.5 h-3.5" />
                        {getSubjectName(item.subjectId)}
                      </span>
                    )}
                  </div>

                  {item.status === "Answered" ? (
                    <span className="flex items-center gap-1 text-[13px] font-bold px-3 py-1 rounded-md bg-[#d1ecf1] text-[#0c5460]">
                      <CheckCircle2 className="w-4 h-4" /> Answered
                    </span>
                  ) : (
                    <span className="text-[13px] font-bold px-3 py-1 rounded-md bg-[#fff3cd] text-[#856404]">
                      Pending Answer
                    </span>
                  )}
                </div>

                <h4 className="text-[18px] font-bold text-secondary mb-2 m-0">Q: {item.question}</h4>

                {item.answer ? (
                  <div className="p-4 rounded-[12px] bg-[#f8fafc] border border-[#e2e8f0] mt-3">
                    <p className="text-[14px] font-bold text-primary mb-1 m-0">Your Answer:</p>
                    <p className="text-[15px] text-[#475569] m-0 leading-relaxed">{item.answer}</p>
                  </div>
                ) : activeDoubtId === item.doubtId ? (
                  <div className="space-y-3 mt-4">
                    <textarea
                      rows={3}
                      value={answerInput}
                      onChange={(e) => setAnswerInput(e.target.value)}
                      placeholder="Type your explanation or answer..."
                      className="w-full px-4 py-3 bg-white border border-[#cbd5e1] rounded-xl text-secondary text-[15px] focus:outline-none focus:border-primary placeholder:text-slate-400"
                    />
                    <div className="flex gap-2">
                      <button
                        onClick={() => handlePostAnswer(item.doubtId)}
                        disabled={isPending}
                        className="px-5 py-2.5 bg-primary hover:bg-blue-700 text-white text-[14px] font-bold rounded-xl flex items-center gap-2 cursor-pointer border-none shadow-[0_4px_10px_rgba(37,99,235,0.2)] disabled:opacity-50"
                      >
                        <Send className="w-4 h-4" /> {isPending ? "Submitting..." : "Submit Answer"}
                      </button>
                      <button
                        onClick={() => setActiveDoubtId(null)}
                        className="px-5 py-2.5 bg-[#f1f5f9] hover:bg-[#e2e8f0] text-[#64748b] text-[14px] font-bold rounded-xl cursor-pointer border-none"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                ) : (
                  <button
                    onClick={() => setActiveDoubtId(item.doubtId)}
                    className="px-5 py-2 bg-primary hover:bg-blue-700 text-white text-[14px] font-bold rounded-xl transition-all cursor-pointer border-none shadow-[0_4px_10px_rgba(37,99,235,0.2)] mt-2"
                  >
                    Answer Query
                  </button>
                )}
              </div>
            ))
          )}
        </div>
      </main>
    </div>
  );
}
