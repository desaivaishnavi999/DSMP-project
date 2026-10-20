import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import {
  GraduationCap,
  LogOut,
  Bell,
  BookOpen,
  FileText,
  HelpCircle,
  Upload,
  CheckSquare,
  ShieldCheck,
  Menu,
  X,
  User,
} from "lucide-react";
import { useAuthStore } from "@/store/useAuthStore";
import { ROUTES } from "@/constants";

interface NavbarProps {
  role: "student" | "teacher" | "admin";
  userName?: string;
}

export const Navbar: React.FC<NavbarProps> = ({ role, userName = "User" }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const logout = useAuthStore((state) => state.logout);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate(ROUTES.LOGIN);
  };

  const studentLinks = [
    { label: "Dashboard", path: ROUTES.STUDENT.DASHBOARD, icon: GraduationCap },
    { label: "Materials & PYQs", path: ROUTES.STUDENT.MATERIALS, icon: BookOpen },
    { label: "Assignments", path: ROUTES.STUDENT.ASSIGNMENTS, icon: FileText },
    { label: "Doubts", path: ROUTES.STUDENT.DOUBTS, icon: HelpCircle },
    { label: "Notifications", path: ROUTES.STUDENT.NOTIFICATIONS, icon: Bell },
  ];

  const teacherLinks = [
    { label: "Dashboard", path: ROUTES.TEACHER.DASHBOARD, icon: GraduationCap },
    { label: "Upload Notes", path: ROUTES.TEACHER.UPLOAD_NOTES, icon: Upload },
    { label: "Assignments", path: ROUTES.TEACHER.ASSIGNMENTS, icon: FileText },
    { label: "Submissions", path: ROUTES.TEACHER.SUBMISSIONS, icon: CheckSquare },
    { label: "Student Doubts", path: ROUTES.TEACHER.DOUBTS, icon: HelpCircle },
  ];

  const adminLinks = [
    { label: "Academic Master", path: ROUTES.ADMIN.MASTER, icon: ShieldCheck },
  ];

  const links = role === "teacher" ? teacherLinks : role === "admin" ? adminLinks : studentLinks;
  const profilePath =
    role === "teacher"
      ? ROUTES.TEACHER.PROFILE
      : role === "admin"
      ? ROUTES.ADMIN.MASTER
      : ROUTES.STUDENT.PROFILE;
  const homePath =
    role === "teacher"
      ? ROUTES.TEACHER.DASHBOARD
      : role === "admin"
      ? ROUTES.ADMIN.MASTER
      : ROUTES.STUDENT.DASHBOARD;

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-xl border-b border-[#e1eaf8] shadow-[0_4px_30px_rgba(30,64,175,0.05)] py-3">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand Logo */}
        <Link to={homePath} className="flex items-center gap-2.5 no-underline group">
          <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-primary text-white shadow-[0_4px_10px_rgba(37,99,235,0.2)] group-hover:shadow-[0_6px_15px_rgba(37,99,235,0.3)] transition-all">
            <GraduationCap className="w-6 h-6" />
          </div>
          <div className="flex flex-col">
            <span className="text-[18px] font-bold text-secondary leading-tight">CSE IntelliLearn</span>
            <span className="text-[11px] font-bold text-primary tracking-wider uppercase">
              {role} Portal
            </span>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-1.5">
          {links.map((link) => {
            const Icon = link.icon;
            const isActive = location.pathname === link.path;
            return (
              <Link
                key={link.path}
                to={link.path}
                className={`px-3.5 py-2 rounded-xl text-[14px] font-bold flex items-center gap-2 transition-all no-underline ${
                  isActive
                    ? "bg-primary-light text-primary shadow-sm"
                    : "text-[#64748b] hover:bg-slate-50 hover:text-secondary"
                }`}
              >
                <Icon className="w-4 h-4" />
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* User Info & Actions */}
        <div className="flex items-center gap-3">
          <Link
            to={profilePath}
            className="flex items-center gap-2 pl-2 pr-3 py-1.5 rounded-full hover:bg-slate-50 border border-transparent hover:border-[#e2e8f0] transition-all no-underline group"
          >
            <div className="w-8 h-8 rounded-full bg-primary-light text-primary flex items-center justify-center font-bold text-[14px]">
              {userName.substring(0, 1).toUpperCase()}
            </div>
            <span className="hidden sm:block text-[14px] font-bold text-secondary group-hover:text-primary transition-colors">
              {userName.split(" ")[0]}
            </span>
          </Link>

          <div className="w-[1px] h-6 bg-[#e2e8f0] hidden sm:block"></div>

          <button
            onClick={handleLogout}
            title="Logout"
            className="p-2.5 rounded-xl bg-white border border-[#e2e8f0] text-[#64748b] hover:bg-red-50 hover:text-red-600 hover:border-red-200 transition-all cursor-pointer shadow-sm"
          >
            <LogOut className="w-[18px] h-[18px]" />
          </button>

          {/* Mobile hamburger button */}
          <button
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            className="md:hidden p-2.5 rounded-xl bg-white border border-[#e2e8f0] text-[#64748b] hover:text-secondary transition-all cursor-pointer"
            aria-label="Toggle Navigation"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-[#e2e8f0] bg-white px-4 pt-3 pb-4 shadow-lg animate-in fade-in duration-200">
          <div className="flex flex-col gap-1">
            {links.map((link) => {
              const Icon = link.icon;
              const isActive = location.pathname === link.path;
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`px-3.5 py-2.5 rounded-xl text-[14px] font-bold flex items-center gap-2.5 transition-all no-underline ${
                    isActive
                      ? "bg-primary-light text-primary"
                      : "text-[#64748b] hover:bg-slate-50 hover:text-secondary"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {link.label}
                </Link>
              );
            })}
            <Link
              to={profilePath}
              onClick={() => setMobileMenuOpen(false)}
              className="px-3.5 py-2.5 rounded-xl text-[14px] font-bold flex items-center gap-2.5 text-[#64748b] hover:bg-slate-50 hover:text-secondary no-underline"
            >
              <User className="w-4 h-4" />
              My Profile
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};
