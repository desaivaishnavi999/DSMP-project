import React, { useState } from "react";
import { HelpCircle, MessageSquare, Send, CheckCircle2 } from "lucide-react";
import { toast } from "sonner";
import { useAuthStore } from "@/store/useAuthStore";
import type { Doubt } from "@/types";

export default function DoubtsPage() {
  const user = useAuthStore((s) => s.user);
  const userName = user?.name ?? "Student";

  const [doubts, setDoubts] = useState<Doubt[]>([
    {
      id: "1",
      subject: "Data Structures",
      question: "What is the amortized time complexity of dynamic array expansion?",
      author: "Alex Student",
      status: "Answered",
      answer: "When doubling array size upon overflow, the aggregate method shows that N operations cost O(N) total, giving O(1) amortized time per insertion.",
      answeredBy: "Prof. Sharma",
      date: "2026-10-06",
    },
    {
      id: "2",
      subject: "Computer Networks",
      question: "Why is TCP called a byte-stream service instead of a packet-stream service?",
      author: "Alex Student",
      status: "Open",
      date: "2026-10-07",
    },
  ]);

  const [subject, setSubject] = useState("Data Structures");
  const [question, setQuestion] = useState("");

  const handlePostDoubt = (e: React.FormEvent) => {
    e.preventDefault();
    if (!question.trim()) {
      toast.error("Please enter your question.");
      return;
    }

    const newDoubt: Doubt = {
      id: Date.now().toString(),
      subject,
      question,
      author: userName,
      status: "Open",
      date: new Date().toISOString().split("T")[0],
    };

    setDoubts([newDoubt, ...doubts]);
    toast.success("Doubt posted successfully!");
    setQuestion("");
  };

  return (
    <div className="min-h-screen bg-surface text-secondary font-sans flex flex-col">
      
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white p-[30px] rounded-[18px] shadow-[0_5px_20px_rgba(30,64,175,0.08)] mb-[30px] border-l-[5px] border-primary">
          <h1 className="text-[30px] font-bold text-secondary m-0 flex items-center gap-3">
            <HelpCircle className="w-8 h-8 text-primary" />
            Academic Doubts & Q&A
          </h1>
          <p className="mt-[10px] text-[#64748b] text-[16px] mb-0">
            Ask technical queries and receive solutions directly from faculty
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Post Doubt Form */}
          <div className="bg-white border border-[#e1eaf8] shadow-[0_5px_20px_rgba(30,64,175,0.08)] rounded-[18px] p-6 h-fit">
            <h3 className="text-[19px] font-bold text-secondary mb-4 flex items-center gap-2 m-0">
              <MessageSquare className="w-5 h-5 text-primary" />
              Ask a New Question
            </h3>

            <form onSubmit={handlePostDoubt} className="space-y-4">
              <div>
                <label className="block text-[14px] font-bold text-[#12305b] mb-2">
                  Select Subject
                </label>
                <select
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  className="w-full px-4 py-2.5 bg-white border border-[#cbd5e1] rounded-xl text-secondary text-[15px] focus:outline-none focus:border-primary"
                >
                  <option value="Data Structures">Data Structures & Algorithms</option>
                  <option value="DBMS">Database Management Systems</option>
                  <option value="Operating Systems">Operating Systems</option>
                  <option value="Computer Networks">Computer Networks</option>
                  <option value="Compiler Design">Compiler Design</option>
                </select>
              </div>

              <div>
                <label className="block text-[14px] font-bold text-[#12305b] mb-2">
                  Question Description
                </label>
                <textarea
                  rows={4}
                  value={question}
                  onChange={(e) => setQuestion(e.target.value)}
                  placeholder="Type your question or query clearly here..."
                  className="w-full px-4 py-3 bg-white border border-[#cbd5e1] rounded-xl text-secondary placeholder:text-slate-400 text-[15px] focus:outline-none focus:border-primary"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-primary hover:bg-blue-700 text-white font-bold text-[15px] rounded-xl flex items-center justify-center gap-2 transition-all cursor-pointer border-none shadow-[0_4px_10px_rgba(37,99,235,0.2)]"
              >
                <Send className="w-4 h-4" />
                Post Doubt
              </button>
            </form>
          </div>

          {/* List of Doubts */}
          <div className="lg:col-span-2 space-y-4">
            {doubts.map((item) => (
              <div key={item.id} className="bg-white border border-[#e1eaf8] shadow-[0_5px_20px_rgba(30,64,175,0.08)] rounded-[18px] p-6 transition-all hover:-translate-y-1 hover:shadow-[0_10px_28px_rgba(30,64,175,0.15)]">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[13px] font-bold px-3 py-1 rounded-md bg-primary-light text-primary">
                    {item.subject}
                  </span>

                  {item.status === "Answered" ? (
                    <span className="flex items-center gap-1 text-[13px] font-bold px-3 py-1 rounded-md bg-[#d1ecf1] text-[#0c5460]">
                      <CheckCircle2 className="w-4 h-4" /> Answered
                    </span>
                  ) : (
                    <span className="text-[13px] font-bold px-3 py-1 rounded-md bg-[#fff3cd] text-[#856404]">
                      Open Query
                    </span>
                  )}
                </div>

                <h4 className="text-[18px] font-bold text-secondary mb-2 m-0">Q: {item.question}</h4>
                <p className="text-[13px] text-[#64748b] mb-4 m-0">Asked on {item.date}</p>

                {item.answer && (
                  <div className="mt-4 p-4 rounded-[12px] bg-[#f8fafc] border border-[#e2e8f0]">
                    <p className="text-[14px] font-bold text-primary mb-1 m-0">Answer from {item.answeredBy}:</p>
                    <p className="text-[15px] text-[#475569] leading-relaxed m-0">{item.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
