import React from "react";
import { User, Mail, BookOpen, Building, Hash, ShieldCheck } from "lucide-react";
import { useAuthStore } from "@/store/useAuthStore";
import { getNormalizedRole } from "@/types/User";

export default function StudentProfile() {
  const authUser = useAuthStore((s) => s.user);

  const initials = authUser?.name
    ? authUser.name
        .split(" ")
        .map((p) => p[0])
        .slice(0, 2)
        .join("")
        .toUpperCase()
    : "ST";

  return (
    <div className="min-h-screen bg-surface text-secondary font-sans flex flex-col">
      <main className="flex-1 max-w-4xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white p-[30px] rounded-[18px] shadow-[0_5px_20px_rgba(30,64,175,0.08)] mb-[30px] border-l-[5px] border-primary">
          <h1 className="text-[30px] font-bold text-secondary m-0 flex items-center gap-3">
            <User className="w-8 h-8 text-primary" />
            My Student Profile
          </h1>
          <p className="mt-[10px] text-[#64748b] text-[16px] mb-0">
            Personal enrollment details and registered academic credentials.
          </p>
        </div>

        <div className="bg-white border border-[#e1eaf8] shadow-[0_5px_20px_rgba(30,64,175,0.08)] rounded-[18px] p-[30px]">
          <div className="flex flex-col sm:flex-row items-center gap-6 pb-8 border-b border-[#f1f5f9]">
            <div className="w-24 h-24 rounded-2xl bg-primary text-white flex items-center justify-center text-3xl font-extrabold shadow-md">
              {initials}
            </div>
            <div className="text-center sm:text-left">
              <h2 className="text-2xl font-bold text-secondary m-0">{authUser?.name || "Student"}</h2>
              <p className="text-[#64748b] text-[15px] mt-1 mb-0">
                {authUser?.department || "Computer Science & Engineering"}
              </p>
              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 mt-3">
                <span className="px-3 py-1 rounded-md text-[13px] font-bold bg-primary-light text-primary">
                  USN: {authUser?.identifier || "Not Assigned"}
                </span>
                <span className="px-3 py-1 rounded-md text-[13px] font-bold bg-emerald-100 text-emerald-800">
                  Active Student
                </span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-8">
            <div className="flex items-center gap-4 p-5 rounded-[14px] bg-[#f8fafc] border border-[#e2e8f0]">
              <Mail className="w-6 h-6 text-primary shrink-0" />
              <div>
                <span className="block text-[13px] font-bold text-[#64748b]">Email Address</span>
                <span className="text-[15px] font-bold text-secondary break-all">
                  {authUser?.email || "Not specified"}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-4 p-5 rounded-[14px] bg-[#f8fafc] border border-[#e2e8f0]">
              <Hash className="w-6 h-6 text-[#10b981] shrink-0" />
              <div>
                <span className="block text-[13px] font-bold text-[#64748b]">Roll Number / USN</span>
                <span className="text-[15px] font-bold text-secondary">
                  {authUser?.identifier || "Not registered"}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-4 p-5 rounded-[14px] bg-[#f8fafc] border border-[#e2e8f0]">
              <BookOpen className="w-6 h-6 text-[#8b5cf6] shrink-0" />
              <div>
                <span className="block text-[13px] font-bold text-[#64748b]">Current Enrollment</span>
                <span className="text-[15px] font-bold text-secondary">
                  {authUser?.semester ? `Semester ${authUser.semester}` : "Semester N/A"}
                  {authUser?.year ? ` (Year ${authUser.year})` : ""}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-4 p-5 rounded-[14px] bg-[#f8fafc] border border-[#e2e8f0]">
              <Building className="w-6 h-6 text-[#f59e0b] shrink-0" />
              <div>
                <span className="block text-[13px] font-bold text-[#64748b]">Department</span>
                <span className="text-[15px] font-bold text-secondary">
                  {authUser?.department || "Computer Science & Engineering"}
                </span>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
