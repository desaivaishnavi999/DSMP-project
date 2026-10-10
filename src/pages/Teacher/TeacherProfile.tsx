import React from "react";
import { User, Mail, BookOpen, Building, Phone, Award } from "lucide-react";
import { useAuthStore } from "@/store/useAuthStore";

export default function TeacherProfile() {
  const authUser = useAuthStore((s) => s.user);

  const profile = {
    name: authUser?.name || "Teacher",
    email: authUser?.email || "teacher.faculty@university.edu",
    employeeId: authUser?.identifier || "EMP98210",
    department: authUser?.department || "Computer Science & Engineering",
    designation: "Associate Professor",
    mobile: "+91 98123 45678",
    courses: ["Data Structures & Algorithms", "Database Systems"],
  };

  return (
    <div className="min-h-screen bg-surface text-secondary font-sans flex flex-col">
      
      <main className="flex-1 max-w-4xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white p-[30px] rounded-[18px] shadow-[0_5px_20px_rgba(30,64,175,0.08)] mb-[30px] border-l-[5px] border-primary">
          <h1 className="text-[30px] font-bold text-secondary m-0 flex items-center gap-3">
            <User className="w-8 h-8 text-primary" />
            Faculty Profile
          </h1>
          <p className="mt-[10px] text-[#64748b] text-[16px] mb-0">
            Teacher account details and assigned academic department courses
          </p>
        </div>

        <div className="bg-white border border-[#e1eaf8] shadow-[0_5px_20px_rgba(30,64,175,0.08)] rounded-[18px] p-[30px]">
          <div className="flex flex-col sm:flex-row items-center gap-6 pb-8 border-b border-[#f1f5f9]">
            <div className="w-24 h-24 rounded-2xl bg-primary-light text-primary flex items-center justify-center text-3xl font-extrabold">
              {profile.name.substring(0, 2).toUpperCase()}
            </div>
            <div className="text-center sm:text-left">
              <h2 className="text-2xl font-bold text-secondary m-0">{profile.name}</h2>
              <p className="text-[#64748b] text-[15px] mt-1 mb-0">{profile.designation} • {profile.department}</p>
              <span className="inline-block mt-3 px-3 py-1 rounded-md text-[13px] font-bold bg-primary-light text-primary">
                {profile.employeeId}
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-8">
            <div className="flex items-center gap-4 p-5 rounded-[14px] bg-[#f8fafc] border border-[#e2e8f0]">
              <Mail className="w-6 h-6 text-primary" />
              <div>
                <span className="block text-[13px] font-bold text-[#64748b]">Official Email</span>
                <span className="text-[15px] font-bold text-secondary">{profile.email}</span>
              </div>
            </div>

            <div className="flex items-center gap-4 p-5 rounded-[14px] bg-[#f8fafc] border border-[#e2e8f0]">
              <Phone className="w-6 h-6 text-[#10b981]" />
              <div>
                <span className="block text-[13px] font-bold text-[#64748b]">Phone Number</span>
                <span className="text-[15px] font-bold text-secondary">{profile.mobile}</span>
              </div>
            </div>

            <div className="flex items-center gap-4 p-5 rounded-[14px] bg-[#f8fafc] border border-[#e2e8f0]">
              <Building className="w-6 h-6 text-[#f59e0b]" />
              <div>
                <span className="block text-[13px] font-bold text-[#64748b]">Department</span>
                <span className="text-[15px] font-bold text-secondary">{profile.department}</span>
              </div>
            </div>

            <div className="flex items-center gap-4 p-5 rounded-[14px] bg-[#f8fafc] border border-[#e2e8f0]">
              <BookOpen className="w-6 h-6 text-[#8b5cf6]" />
              <div>
                <span className="block text-[13px] font-bold text-[#64748b]">Handled Courses</span>
                <span className="text-[15px] font-bold text-secondary">{profile.courses.join(", ")}</span>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
