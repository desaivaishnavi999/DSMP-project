import React, { useState } from "react";
import { HelpCircle, Send, CheckCircle2 } from "lucide-react";
import { toast } from "sonner";
import { useAuthStore } from "@/store/useAuthStore";
import type { Doubt } from "@/types";

export default function TeacherDoubtsPage() {
  const user = useAuthStore((s) => s.user);
  const userName = user?.name ?? "Teacher";

  const [doubts, setDoubts] = useState<Doubt[]>([
    {
      id: "1",
      studentName: "Alex Student",
      rollNumber: "1CS21045",
      subject: "Computer Networks",
      question: "Why is TCP called a byte-stream service instead of a packet-stream service?",
      status: "Open",
      date: "2026-10-07",
    },
    {
      id: "2",
      studentName: "Priya Singh",
      rollNumber: "1CS21012",
      subject: "Data Structures",
      question: "What is the amortized time complexity of dynamic array expansion?",
      status: "Answered",
      answer: "When doubling array size upon overflow, aggregate analysis proves O(1) amortized insertion cost.",
      date: "2026-10-06",
    },
  ]);

  const [activeDoubtId, setActiveDoubtId] = useState<string | null>(null);
  const [answerInput, setAnswerInput] = useState("");

  const handlePostAnswer = (id: string) => {
    if (!answerInput.trim()) return;
    setDoubts((prev) =>
      prev.map((d) =>
        d.id === id ? { ...d, status: "Answered", answer: answerInput } : d
      )
    );
    toast.success("Answer posted to student doubt!");
    setActiveDoubtId(null);
    setAnswerInput("");
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
          {doubts.map((item) => (
            <div key={item.id} className="bg-white border border-[#e1eaf8] shadow-[0_5px_20px_rgba(30,64,175,0.08)] rounded-[18px] p-6 transition-all hover:-translate-y-1 hover:shadow-[0_10px_28px_rgba(30,64,175,0.15)]">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <span className="text-[13px] font-bold px-3 py-1 rounded-md bg-primary-light text-primary">
                    {item.subject}
                  </span>
                  <span className="text-[13px] text-[#64748b]">Asked by {item.studentName} ({item.rollNumber})</span>
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
              <p className="text-[13px] text-[#64748b] mb-4 m-0">Date: {item.date}</p>

              {item.answer ? (
                <div className="p-4 rounded-[12px] bg-[#f8fafc] border border-[#e2e8f0]">
                  <p className="text-[14px] font-bold text-primary mb-1 m-0">Your Answer:</p>
                  <p className="text-[15px] text-[#475569] m-0 leading-relaxed">{item.answer}</p>
                </div>
              ) : activeDoubtId === item.id ? (
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
                      onClick={() => handlePostAnswer(item.id)}
                      className="px-5 py-2.5 bg-primary hover:bg-blue-700 text-white text-[14px] font-bold rounded-xl flex items-center gap-2 cursor-pointer border-none shadow-[0_4px_10px_rgba(37,99,235,0.2)]"
                    >
                      <Send className="w-4 h-4" /> Submit Answer
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
                  onClick={() => setActiveDoubtId(item.id)}
                  className="px-5 py-2 bg-primary hover:bg-blue-700 text-white text-[14px] font-bold rounded-xl transition-all cursor-pointer border-none shadow-[0_4px_10px_rgba(37,99,235,0.2)]"
                >
                  Answer Query
                </button>
              )}
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
