import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuthStore } from "@/store/useAuthStore";
import { toast } from "sonner";
import { ROUTES } from "@/constants";
import { GraduationCap, BookOpen, FileText, ClipboardList, Lightbulb, Hand } from "lucide-react";

import { useLogin } from "@/hooks";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("student");

  const { mutate: login, isPending } = useLogin();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error("Please fill in all fields.");
      return;
    }

    login({ email, password });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f8fbff] to-[#eaf2ff] flex items-center justify-center p-5 font-sans">
      <div className="w-full max-w-[950px] min-h-[560px] bg-white rounded-[24px] shadow-[0_20px_60px_rgba(30,64,175,0.18)] flex flex-col md:flex-row overflow-hidden">
        
        {/* LEFT SIDE */}
        <div className="w-full md:w-[48%] bg-gradient-to-br from-[#172554] via-[#1e3a8a] to-[#1d4ed8] text-white p-[35px_30px] md:p-[55px_45px] flex flex-col justify-center relative overflow-hidden">
          <div className="absolute w-[280px] h-[280px] rounded-full bg-white/[0.06] -top-[100px] -right-[100px]" />
          <div className="absolute w-[220px] h-[220px] rounded-full bg-blue-400/[0.10] -bottom-[100px] -left-[80px]" />

          <div className="relative z-10">
            <div className="mb-[18px]">
              <GraduationCap className="w-14 h-14" />
            </div>
            
            <h1 className="m-0 text-[28px] md:text-[34px] font-bold">
              CSE IntelliLearn
            </h1>
            
            <p className="mt-[15px] text-[17px] leading-[1.6] text-[#dbeafe]">
              Smart learning and academic support platform for Computer Science students.
            </p>

            <div className="mt-[25px] hidden md:block space-y-[13px]">
              <div className="text-[15px] text-[#eff6ff] flex items-center gap-3">
                <BookOpen className="w-5 h-5" /> Unit-wise Study Materials
              </div>
              <div className="text-[15px] text-[#eff6ff] flex items-center gap-3">
                <FileText className="w-5 h-5" /> Previous Year Questions
              </div>
              <div className="text-[15px] text-[#eff6ff] flex items-center gap-3">
                <ClipboardList className="w-5 h-5" /> Assignments & Submissions
              </div>
              <div className="text-[15px] text-[#eff6ff] flex items-center gap-3">
                <Lightbulb className="w-5 h-5" /> Smart Learning Support
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="w-full md:w-[52%] bg-white p-[35px_30px] md:p-[55px_50px] flex flex-col justify-center">
          <h2 className="m-0 text-[30px] font-bold text-[#172554] flex items-center gap-2">
            Welcome Back <Hand className="w-7 h-7 text-[#2563eb]" />
          </h2>
          
          <p className="mt-[8px] mb-[30px] text-[15px] text-[#64748b]">
            Login to continue your learning journey.
          </p>

          <form onSubmit={handleSubmit} className="space-y-[20px]">
            <div>
              <label className="block mb-[8px] text-[14px] font-bold text-[#1e293b]">
                Email Address
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                required
                className="w-full p-[14px_15px] border border-[#cbd5e1] rounded-[10px] text-[15px] text-[#172554] outline-none bg-[#f8fafc] transition-all focus:border-[#2563eb] focus:bg-white focus:shadow-[0_0_0_3px_rgba(37,99,235,0.10)]"
              />
            </div>

            <div>
              <label className="block mb-[8px] text-[14px] font-bold text-[#1e293b]">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                required
                className="w-full p-[14px_15px] border border-[#cbd5e1] rounded-[10px] text-[15px] text-[#172554] outline-none bg-[#f8fafc] transition-all focus:border-[#2563eb] focus:bg-white focus:shadow-[0_0_0_3px_rgba(37,99,235,0.10)]"
              />
            </div>

            <div>
              <label className="block mb-[8px] text-[14px] font-bold text-[#1e293b]">
                Login As
              </label>
              <select
                value={role}
                onChange={(e) => setRole(e.target.value)}
                required
                className="w-full p-[14px_15px] border border-[#cbd5e1] rounded-[10px] text-[15px] text-[#172554] outline-none bg-[#f8fafc] transition-all focus:border-[#2563eb] focus:bg-white focus:shadow-[0_0_0_3px_rgba(37,99,235,0.10)]"
              >
                <option value="" disabled>Select Role</option>
                <option value="student">Student</option>
                <option value="teacher">Teacher</option>
                <option value="admin">Admin</option>
              </select>
            </div>

            <button
              type="submit"
              disabled={isPending}
              className="w-full p-[14px] mt-[5px] border-none rounded-[10px] bg-gradient-to-br from-[#172554] to-[#2563eb] text-white text-[16px] font-bold cursor-pointer transition-all hover:-translate-y-[2px] hover:shadow-[0_8px_20px_rgba(37,99,235,0.25)] flex items-center justify-center gap-2"
            >
              {isPending ? (
                <>
                  <span className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                  Logging in...
                </>
              ) : (
                "Login"
              )}
            </button>
          </form>

          <div className="mt-[25px] text-center text-[#94a3b8] text-[13px]">
            © 2026 CSE IntelliLearn<br />Learn • Practice • Grow
          </div>
        </div>
      </div>
    </div>
  );
}
