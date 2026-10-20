import React from "react";
import { useNavigate } from "react-router-dom";
import { TeacherCard } from "@/components/Dashboard";
import { TEACHER_DASHBOARD_CARDS, ROUTES } from "@/constants";
import { useAuthStore } from "@/store/useAuthStore";
import { useAssignments, useDoubts, useAllSubjects } from "@/hooks";
import {
  Hand,
  ClipboardList,
  CheckSquare,
  HelpCircle,
  Layers,
  ArrowRight,
  Calendar,
  Sparkles,
  MessageSquare,
} from "lucide-react";

export default function TeacherDashboard() {
  const navigate = useNavigate();
  const { user } = useAuthStore();

  const { data: assignments = [], isLoading: loadingAssignments } = useAssignments();
  const { data: doubts = [], isLoading: loadingDoubts } = useDoubts();
  const { data: subjects = [] } = useAllSubjects();

  // Metrics
  const myAssignments = assignments.filter(
    (a: any) => String(a.teacherId) === String(user?.id) || !a.teacherId
  );
  const pendingDoubts = doubts.filter((d: any) => d.status !== "Answered");
  const answeredDoubts = doubts.filter((d: any) => d.status === "Answered");

  const getSubjectName = (subjectId: number | string) => {
    const sub = subjects.find((s: any) => String(s.subjectId) === String(subjectId));
    return sub ? `${sub.subjectName} (${sub.subjectCode || "CSE"})` : `Subject #${subjectId}`;
  };

  const recentPendingDoubts = pendingDoubts.slice(0, 3);
  const recentAssignments = assignments.slice(0, 3);

  return (
    <div className="min-h-screen bg-surface text-secondary font-sans flex flex-col">
      <main className="flex-1 max-w-[1200px] w-full mx-auto mt-[35px] mb-0 px-[20px] pb-[40px]">
        {/* Welcome Header */}
        <div className="bg-white p-[30px] rounded-[18px] shadow-[0_5px_20px_rgba(30,64,175,0.08)] mb-[24px] border-l-[5px] border-primary flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-[28px] sm:text-[32px] font-bold text-secondary m-0 flex items-center gap-3">
              Welcome, Prof. {user?.name?.split(" ")[0] || "Faculty"}!
              <Hand className="w-8 h-8 text-primary animate-bounce" />
            </h1>
            <p className="mt-[8px] text-[#64748b] text-[15px] sm:text-[16px] mb-0">
              Department of {user?.department || "Computer Science & Engineering"} &bull; Faculty Portal
            </p>
          </div>

          <div className="flex items-center gap-2 self-start md:self-auto">
            <span className="px-3.5 py-1.5 rounded-full bg-blue-100 text-blue-800 font-bold text-[13px] border border-blue-200 flex items-center gap-1.5">
              <Sparkles className="w-4 h-4" />
              Faculty ID: {user?.identifier || "FAC-001"}
            </span>
          </div>
        </div>

        {/* Live Faculty KPI Stat Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div
            onClick={() => navigate(ROUTES.TEACHER.ASSIGNMENTS)}
            className="bg-white p-5 rounded-2xl border border-[#e1eaf8] shadow-sm hover:shadow-md transition-all cursor-pointer group"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-[13px] font-bold text-[#64748b]">Active Assignments</span>
              <div className="w-9 h-9 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold">
                <ClipboardList className="w-5 h-5" />
              </div>
            </div>
            <div className="text-3xl font-extrabold text-secondary">
              {loadingAssignments ? "..." : assignments.length}
            </div>
            <p className="text-[12px] text-[#94a3b8] mt-1 mb-0 flex items-center gap-1 group-hover:text-primary transition-colors">
              Manage coursework <ArrowRight className="w-3.5 h-3.5" />
            </p>
          </div>

          <div
            onClick={() => navigate(ROUTES.TEACHER.SUBMISSIONS)}
            className="bg-white p-5 rounded-2xl border border-[#e1eaf8] shadow-sm hover:shadow-md transition-all cursor-pointer group"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-[13px] font-bold text-[#64748b]">Review Submissions</span>
              <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold">
                <CheckSquare className="w-5 h-5" />
              </div>
            </div>
            <div className="text-3xl font-extrabold text-secondary">
              {loadingAssignments ? "..." : myAssignments.length}
            </div>
            <p className="text-[12px] text-[#94a3b8] mt-1 mb-0 flex items-center gap-1 group-hover:text-primary transition-colors">
              Review & grade submissions <ArrowRight className="w-3.5 h-3.5" />
            </p>
          </div>

          <div
            onClick={() => navigate(ROUTES.TEACHER.DOUBTS)}
            className="bg-white p-5 rounded-2xl border border-[#e1eaf8] shadow-sm hover:shadow-md transition-all cursor-pointer group"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-[13px] font-bold text-[#64748b]">Pending Doubts</span>
              <div className="w-9 h-9 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center font-bold">
                <HelpCircle className="w-5 h-5" />
              </div>
            </div>
            <div className="text-3xl font-extrabold text-secondary">
              {loadingDoubts ? "..." : pendingDoubts.length}
            </div>
            <p className="text-[12px] text-[#94a3b8] mt-1 mb-0 flex items-center gap-1 group-hover:text-primary transition-colors">
              Awaiting answers <ArrowRight className="w-3.5 h-3.5" />
            </p>
          </div>

          <div
            onClick={() => navigate(ROUTES.TEACHER.UPLOAD_NOTES)}
            className="bg-white p-5 rounded-2xl border border-[#e1eaf8] shadow-sm hover:shadow-md transition-all cursor-pointer group"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-[13px] font-bold text-[#64748b]">Resolved Q&A</span>
              <div className="w-9 h-9 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center font-bold">
                <MessageSquare className="w-5 h-5" />
              </div>
            </div>
            <div className="text-3xl font-extrabold text-secondary">{answeredDoubts.length}</div>
            <p className="text-[12px] text-[#94a3b8] mt-1 mb-0 flex items-center gap-1 group-hover:text-primary transition-colors">
              Answered queries <ArrowRight className="w-3.5 h-3.5" />
            </p>
          </div>
        </div>

        {/* Action Needed: Pending Student Doubts Widget */}
        {recentPendingDoubts.length > 0 && (
          <div className="bg-white border border-[#e1eaf8] shadow-[0_5px_20px_rgba(30,64,175,0.06)] rounded-[18px] p-6 mb-8">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <HelpCircle className="w-5 h-5 text-amber-500" />
                <h3 className="text-[18px] font-bold text-secondary m-0">Student Queries Awaiting Response</h3>
              </div>
              <button
                onClick={() => navigate(ROUTES.TEACHER.DOUBTS)}
                className="text-primary hover:text-blue-700 font-bold text-[13px] flex items-center gap-1 bg-transparent border-none cursor-pointer"
              >
                View All Doubts ({pendingDoubts.length}) <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {recentPendingDoubts.map((d: any) => (
                <div
                  key={d.doubtId}
                  className="p-4 rounded-xl border border-[#e2e8f0] bg-[#f8fafc] hover:bg-white hover:shadow-md transition-all flex flex-col justify-between"
                >
                  <div>
                    <span className="text-[11px] font-bold px-2.5 py-0.5 rounded bg-amber-100 text-amber-800 uppercase inline-block mb-2">
                      {getSubjectName(d.subjectId)}
                    </span>
                    <h4 className="text-[15px] font-bold text-secondary m-0 line-clamp-1">{d.title}</h4>
                    <p className="text-[13px] text-[#64748b] mt-1 mb-3 line-clamp-2">{d.question}</p>
                  </div>

                  <button
                    onClick={() => navigate(ROUTES.TEACHER.DOUBTS)}
                    className="w-full py-2 bg-primary hover:bg-blue-700 text-white rounded-lg text-[13px] font-bold border-none cursor-pointer shadow-sm transition-colors"
                  >
                    Answer Query
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Quick Access to Faculty Portals */}
        <h3 className="text-[20px] font-bold text-secondary mb-4 flex items-center gap-2">
          <Layers className="w-5 h-5 text-primary" />
          Faculty Workflows & Tools
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-[22px]">
          {TEACHER_DASHBOARD_CARDS.map((card, idx) => (
            <TeacherCard
              key={idx}
              title={card.title}
              description={card.description}
              icon={card.icon}
              onClick={() => navigate(card.route)}
            />
          ))}
        </div>
      </main>
    </div>
  );
}
