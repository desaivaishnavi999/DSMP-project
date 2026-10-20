import React from "react";
import { useNavigate } from "react-router-dom";
import { StudentCard } from "@/components/Dashboard";
import { STUDENT_DASHBOARD_CARDS, ROUTES } from "@/constants";
import { useAuthStore } from "@/store/useAuthStore";
import {
  useAssignments,
  useStudentSubmissions,
  useDoubts,
  useNotifications,
  useAllSubjects,
} from "@/hooks";
import {
  Hand,
  Clock,
  CheckCircle2,
  HelpCircle,
  Bell,
  ArrowRight,
  BookOpen,
  Calendar,
  Sparkles,
} from "lucide-react";

export default function StudentDashboard() {
  const navigate = useNavigate();
  const { user } = useAuthStore();

  const { data: assignments = [], isLoading: loadingAssignments } = useAssignments();
  const { data: submissions = [], isLoading: loadingSubmissions } = useStudentSubmissions(user?.id);
  const { data: doubts = [] } = useDoubts();
  const { data: subjects = [] } = useAllSubjects();
  const { unreadCount } = useNotifications();

  // Metrics calculation
  const submittedAssignmentIds = new Set(submissions.map((s: any) => String(s.assignmentId)));
  const pendingAssignments = assignments.filter((a: any) => !submittedAssignmentIds.has(String(a.assignmentId)));
  const checkedSubmissions = submissions.filter((s: any) => s.status === "Checked");

  const myDoubts = doubts.filter((d: any) => String(d.studentId) === String(user?.id));
  const myAnsweredDoubts = myDoubts.filter((d: any) => d.status === "Answered");

  const getSubjectName = (subjectId: number | string) => {
    const sub = subjects.find((s: any) => String(s.subjectId) === String(subjectId));
    return sub ? `${sub.subjectName} (${sub.subjectCode || "CSE"})` : `Subject #${subjectId}`;
  };

  const upcomingPendingAssignments = [...pendingAssignments]
    .sort((a: any, b: any) => new Date(a.dueDate || 0).getTime() - new Date(b.dueDate || 0).getTime())
    .slice(0, 3);

  return (
    <div className="min-h-screen bg-surface text-secondary font-sans flex flex-col">
      <main className="flex-1 max-w-[1200px] w-full mx-auto mt-[35px] mb-0 px-[20px] pb-[40px]">
        {/* Welcome Header */}
        <div className="bg-white p-[30px] rounded-[18px] shadow-[0_5px_20px_rgba(30,64,175,0.08)] mb-[24px] border-l-[5px] border-primary flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-[28px] sm:text-[32px] font-bold text-secondary m-0 flex items-center gap-3">
              Welcome back, {user?.name?.split(" ")[0] || "Student"}!
              <Hand className="w-8 h-8 text-primary animate-bounce" />
            </h1>
            <p className="mt-[8px] text-[#64748b] text-[15px] sm:text-[16px] mb-0">
              Department of {user?.department || "Computer Science & Engineering"} &bull;{" "}
              <span className="font-semibold text-primary">
                {user?.semester ? `Semester ${user.semester}` : "Semester Enrolled"}
                {user?.year ? ` (Year ${user.year})` : ""}
              </span>
            </p>
          </div>

          <div className="flex items-center gap-2 self-start md:self-auto">
            <span className="px-3.5 py-1.5 rounded-full bg-primary-light text-primary font-bold text-[13px] border border-blue-100 flex items-center gap-1.5">
              <Sparkles className="w-4 h-4" />
              USN: {user?.identifier || "Registered Student"}
            </span>
          </div>
        </div>

        {/* Live Academic KPI Stat Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div
            onClick={() => navigate(ROUTES.STUDENT.ASSIGNMENTS)}
            className="bg-white p-5 rounded-2xl border border-[#e1eaf8] shadow-sm hover:shadow-md transition-all cursor-pointer group"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-[13px] font-bold text-[#64748b]">Pending Tasks</span>
              <div className="w-9 h-9 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center font-bold">
                <Clock className="w-5 h-5" />
              </div>
            </div>
            <div className="text-3xl font-extrabold text-secondary">
              {loadingAssignments ? "..." : pendingAssignments.length}
            </div>
            <p className="text-[12px] text-[#94a3b8] mt-1 mb-0 flex items-center gap-1 group-hover:text-primary transition-colors">
              Assignments to submit <ArrowRight className="w-3.5 h-3.5" />
            </p>
          </div>

          <div
            onClick={() => navigate(ROUTES.STUDENT.ASSIGNMENTS)}
            className="bg-white p-5 rounded-2xl border border-[#e1eaf8] shadow-sm hover:shadow-md transition-all cursor-pointer group"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-[13px] font-bold text-[#64748b]">Submitted Work</span>
              <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold">
                <CheckCircle2 className="w-5 h-5" />
              </div>
            </div>
            <div className="text-3xl font-extrabold text-secondary">
              {loadingSubmissions ? "..." : submissions.length}
            </div>
            <p className="text-[12px] text-[#94a3b8] mt-1 mb-0 flex items-center gap-1 group-hover:text-primary transition-colors">
              {checkedSubmissions.length} graded &bull; View feedback <ArrowRight className="w-3.5 h-3.5" />
            </p>
          </div>

          <div
            onClick={() => navigate(ROUTES.STUDENT.DOUBTS)}
            className="bg-white p-5 rounded-2xl border border-[#e1eaf8] shadow-sm hover:shadow-md transition-all cursor-pointer group"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-[13px] font-bold text-[#64748b]">My Doubts</span>
              <div className="w-9 h-9 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center font-bold">
                <HelpCircle className="w-5 h-5" />
              </div>
            </div>
            <div className="text-3xl font-extrabold text-secondary">{myDoubts.length}</div>
            <p className="text-[12px] text-[#94a3b8] mt-1 mb-0 flex items-center gap-1 group-hover:text-primary transition-colors">
              {myAnsweredDoubts.length} answered by faculty <ArrowRight className="w-3.5 h-3.5" />
            </p>
          </div>

          <div
            onClick={() => navigate(ROUTES.STUDENT.NOTIFICATIONS)}
            className="bg-white p-5 rounded-2xl border border-[#e1eaf8] shadow-sm hover:shadow-md transition-all cursor-pointer group"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-[13px] font-bold text-[#64748b]">Notifications</span>
              <div className="w-9 h-9 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold relative">
                <Bell className="w-5 h-5" />
                {unreadCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-red-500 border-2 border-white" />
                )}
              </div>
            </div>
            <div className="text-3xl font-extrabold text-secondary">{unreadCount}</div>
            <p className="text-[12px] text-[#94a3b8] mt-1 mb-0 flex items-center gap-1 group-hover:text-primary transition-colors">
              Unread announcements <ArrowRight className="w-3.5 h-3.5" />
            </p>
          </div>
        </div>

        {/* Action Needed: Upcoming Deadlines Widget */}
        {upcomingPendingAssignments.length > 0 && (
          <div className="bg-white border border-[#e1eaf8] shadow-[0_5px_20px_rgba(30,64,175,0.06)] rounded-[18px] p-6 mb-8">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5 text-amber-500" />
                <h3 className="text-[18px] font-bold text-secondary m-0">Upcoming Assignment Deadlines</h3>
              </div>
              <button
                onClick={() => navigate(ROUTES.STUDENT.ASSIGNMENTS)}
                className="text-primary hover:text-blue-700 font-bold text-[13px] flex items-center gap-1 bg-transparent border-none cursor-pointer"
              >
                View All ({pendingAssignments.length}) <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {upcomingPendingAssignments.map((a: any) => (
                <div
                  key={a.assignmentId}
                  className="p-4 rounded-xl border border-[#e2e8f0] bg-[#f8fafc] hover:bg-white hover:shadow-md transition-all flex flex-col justify-between"
                >
                  <div>
                    <span className="text-[11px] font-bold px-2.5 py-0.5 rounded bg-blue-100 text-blue-800 uppercase inline-block mb-2">
                      {getSubjectName(a.subjectId)}
                    </span>
                    <h4 className="text-[15px] font-bold text-secondary m-0 line-clamp-1">{a.title}</h4>
                    <p className="text-[12px] text-[#64748b] mt-1 mb-3 flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5 text-amber-600" />
                      Due: {a.dueDate ? new Date(a.dueDate).toLocaleDateString() : "No deadline"}
                    </p>
                  </div>

                  <button
                    onClick={() => navigate(ROUTES.STUDENT.ASSIGNMENTS)}
                    className="w-full py-2 bg-primary hover:bg-blue-700 text-white rounded-lg text-[13px] font-bold border-none cursor-pointer shadow-sm transition-colors"
                  >
                    Submit Work
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Primary Navigation Hub */}
        <h3 className="text-[20px] font-bold text-secondary mb-4 flex items-center gap-2">
          <BookOpen className="w-5 h-5 text-primary" />
          Academic Portals & Resources
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-[22px]">
          {STUDENT_DASHBOARD_CARDS.map((card, idx) => (
            <StudentCard
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
