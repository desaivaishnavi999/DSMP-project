import React, { useState } from "react";
import { HelpCircle, MessageSquare, Send, CheckCircle2, BookOpen } from "lucide-react";
import { toast } from "sonner";
import { useAuthStore } from "@/store/useAuthStore";
import { useDoubts, useCreateDoubt, useAllSubjects } from "@/hooks";

export default function DoubtsPage() {
  const user = useAuthStore((s) => s.user);

  const { data: doubtsList = [], isLoading } = useDoubts();
  const { data: subjects = [], isLoading: loadingSubjects } = useAllSubjects();
  const { mutate: createDoubt, isPending } = useCreateDoubt();

  const getSubjectName = (subjectId?: number | string) => {
    if (!subjectId) return null;
    const match = subjects.find((s: any) => String(s.subjectId) === String(subjectId));
    return match ? `${match.subjectCode ? match.subjectCode + " - " : ""}${match.subjectName}` : `Subject #${subjectId}`;
  };

  const [subject, setSubject] = useState("");
  const [title, setTitle] = useState("");
  const [question, setQuestion] = useState("");

  const handlePostDoubt = (e: React.FormEvent) => {
    e.preventDefault();
    if (!question.trim() || !title.trim() || !subject) {
      toast.error("Please enter a title, question, and select a subject.");
      return;
    }

    createDoubt(
      {
        studentId: user?.id ?? 1,
        subjectId: Number(subject),
        title,
        question,
      },
      {
        onSuccess: () => {
          setTitle("");
          setQuestion("");
          setSubject("");
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
                  Doubt Title
                </label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Short title for your query"
                  required
                  className="w-full px-4 py-2.5 bg-white border border-[#cbd5e1] rounded-xl text-secondary text-[15px] focus:outline-none focus:border-primary"
                />
              </div>

              <div>
                <label className="block text-[14px] font-bold text-[#12305b] mb-2">
                  Select Subject
                </label>
                <select
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  required
                  className="w-full px-4 py-2.5 bg-white border border-[#cbd5e1] rounded-xl text-secondary text-[15px] focus:outline-none focus:border-primary"
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
                <label className="block text-[14px] font-bold text-[#12305b] mb-2">
                  Question Description
                </label>
                <textarea
                  rows={4}
                  value={question}
                  onChange={(e) => setQuestion(e.target.value)}
                  placeholder="Type your detailed question or query here..."
                  required
                  className="w-full px-4 py-3 bg-white border border-[#cbd5e1] rounded-xl text-secondary placeholder:text-slate-400 text-[15px] focus:outline-none focus:border-primary"
                />
              </div>

              <button
                type="submit"
                disabled={isPending}
                className="w-full py-3 bg-primary hover:bg-blue-700 text-white font-bold text-[15px] rounded-xl flex items-center justify-center gap-2 transition-all cursor-pointer border-none shadow-[0_4px_10px_rgba(37,99,235,0.2)] disabled:opacity-50"
              >
                <Send className="w-4 h-4" />
                {isPending ? "Posting..." : "Post Doubt"}
              </button>
            </form>
          </div>

          {/* List of Doubts */}
          <div className="lg:col-span-2 space-y-4">
            {isLoading ? (
              <div className="p-8 text-center text-slate-500 font-bold bg-white rounded-2xl border">Loading doubts...</div>
            ) : doubtsList.length === 0 ? (
              <div className="p-12 text-center text-slate-500 bg-white rounded-2xl border">
                No doubts posted yet. Be the first to ask a question!
              </div>
            ) : (
              doubtsList.map((item: any) => (
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
                        Waiting for Answer
                      </span>
                    )}
                  </div>

                  <h4 className="text-[18px] font-bold text-secondary mb-2 m-0">Q: {item.question}</h4>

                  {item.answer && (
                    <div className="mt-4 p-4 rounded-[12px] bg-[#f8fafc] border border-[#e2e8f0]">
                      <p className="text-[14px] font-bold text-primary mb-1 m-0">Teacher Answer:</p>
                      <p className="text-[15px] text-[#475569] leading-relaxed m-0">{item.answer}</p>
                    </div>
                  )}
                </div>
              ))
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
