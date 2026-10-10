import React from "react";
import { Outlet } from "react-router-dom";
import { Navbar } from "@/components/Common/Navbar";
import { useAuthStore } from "@/store/useAuthStore";
import { GraduationCap, Heart } from "lucide-react";

export default function DashboardLayout() {
  const { user } = useAuthStore();
  const role = user?.role === "teacher" ? "teacher" : "student";

  return (
    <div className="min-h-screen bg-surface text-secondary font-sans flex flex-col">
      <Navbar role={role} userName={user?.name || (role === "teacher" ? "Teacher" : "Student")} />
      
      <div className="flex-1 w-full flex flex-col">
        <Outlet />
      </div>

      <footer className="mt-auto bg-[#0a1930] py-8 px-6">
        <div className="max-w-[1200px] mx-auto w-full flex flex-col md:flex-row justify-between items-center gap-6">
          
          {/* Brand */}
          <div className="flex items-center gap-2.5 text-white font-bold text-[16px]">
            <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center backdrop-blur-sm">
              <GraduationCap className="w-5 h-5 text-white" />
            </div>
            CSE IntelliLearn
          </div>
          
          {/* Tagline */}
          <div className="text-[#94a3b8] text-[14px] flex items-center gap-1.5 font-medium">
            Empowering education with <Heart className="w-4 h-4 text-red-500 fill-red-500" /> & technology
          </div>

          {/* Links */}
          <div className="flex items-center gap-6 text-[13px] font-bold text-[#64748b]">
            <a href="#" className="text-[#94a3b8] hover:text-white transition-colors no-underline">Support</a>
            <a href="#" className="text-[#94a3b8] hover:text-white transition-colors no-underline">Privacy</a>
            <a href="#" className="text-[#94a3b8] hover:text-white transition-colors no-underline">Terms</a>
          </div>
          
        </div>
      </footer>
    </div>
  );
}
