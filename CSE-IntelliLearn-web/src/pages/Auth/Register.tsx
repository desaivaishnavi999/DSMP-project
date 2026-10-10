import React, { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import { UserCheck, Lock, Mail, User, Building, BookOpen, GraduationCap, Calendar, Layers } from "lucide-react";
import { useRegister } from "@/hooks";

export default function Register() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("student");
  const [identifier, setIdentifier] = useState("");
  const [year, setYear] = useState<number>(3);
  const [semester, setSemester] = useState<number>(5);

  const { mutate: register, isPending } = useRegister();

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !email || !password || !role) {
      toast.error("Please fill in all required fields.");
      return;
    }

    const backendRole = role === "teacher" ? "ROLE_TEACHER" : "ROLE_STUDENT";

    register({
      name: fullName,
      email,
      password,
      role: backendRole,
      year: role === "student" ? Number(year) : null,
      semester: role === "student" ? Number(semester) : null,
      identifier,
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-surface p-4 relative overflow-hidden font-sans">
      {/* Abstract Background Shapes */}
      <div className="absolute top-[-100px] left-[-100px] w-[300px] h-[300px] rounded-full bg-[#e1eaf8] blur-[80px]" />
      <div className="absolute bottom-[-100px] right-[-100px] w-[300px] h-[300px] rounded-full bg-[#dbeafe] blur-[80px]" />

      <div className="w-full max-w-lg bg-white rounded-[24px] p-8 shadow-[0_10px_40px_rgba(30,64,175,0.08)] relative z-10 border border-[#e1eaf8]">
        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary-light text-primary mb-4 border border-[#dbeafe]">
            <GraduationCap className="w-8 h-8" />
          </div>
          <h1 className="text-2xl font-bold text-secondary m-0">Create Account</h1>
          <p className="text-[#64748b] text-[15px] mt-2 mb-0">
            Join CSE IntelliLearn to start your academic journey
          </p>
        </div>

        <form onSubmit={handleRegister} className="space-y-4">
          {/* Full Name */}
          <div>
            <label className="block text-[14px] font-bold text-secondary mb-2">
              Full Name
            </label>
            <div className="relative">
              <User className="absolute left-4 top-3.5 w-5 h-5 text-slate-400" />
              <input
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="John Doe"
                required
                className="w-full pl-12 pr-4 py-3 bg-white border border-[#cbd5e1] rounded-[12px] text-secondary placeholder:text-slate-400 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary text-[15px]"
              />
            </div>
          </div>

          {/* Email */}
          <div>
            <label className="block text-[14px] font-bold text-secondary mb-2">
              Email Address
            </label>
            <div className="relative">
              <Mail className="absolute left-4 top-3.5 w-5 h-5 text-slate-400" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="student@university.edu"
                required
                className="w-full pl-12 pr-4 py-3 bg-white border border-[#cbd5e1] rounded-[12px] text-secondary placeholder:text-slate-400 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary text-[15px]"
              />
            </div>
          </div>

          {/* Role Selection */}
          <div>
            <label className="block text-[14px] font-bold text-secondary mb-2">
              Register As
            </label>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setRole("student")}
                className={`py-3 px-4 rounded-[12px] text-[15px] font-bold flex items-center justify-center gap-2 transition-all cursor-pointer border ${
                  role === "student"
                    ? "bg-primary-light border-primary text-primary"
                    : "bg-white border-[#cbd5e1] text-[#64748b] hover:bg-surface"
                }`}
              >
                <BookOpen className="w-4 h-4" />
                Student
              </button>
              <button
                type="button"
                onClick={() => setRole("teacher")}
                className={`py-3 px-4 rounded-[12px] text-[15px] font-bold flex items-center justify-center gap-2 transition-all cursor-pointer border ${
                  role === "teacher"
                    ? "bg-primary-light border-primary text-primary"
                    : "bg-white border-[#cbd5e1] text-[#64748b] hover:bg-surface"
                }`}
              >
                <UserCheck className="w-4 h-4" />
                Teacher
              </button>
            </div>
          </div>

          {/* Student Specific: Year & Semester Selection */}
          {role === "student" && (
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-[14px] font-bold text-secondary mb-2">
                  Academic Year
                </label>
                <div className="relative">
                  <Calendar className="absolute left-3.5 top-3.5 w-4 h-4 text-slate-400" />
                  <select
                    value={year}
                    onChange={(e) => setYear(Number(e.target.value))}
                    className="w-full pl-10 pr-3 py-3 bg-white border border-[#cbd5e1] rounded-[12px] text-secondary focus:outline-none focus:border-primary text-[14px]"
                  >
                    <option value={1}>1st Year</option>
                    <option value={2}>2nd Year</option>
                    <option value={3}>3rd Year</option>
                    <option value={4}>4th Year</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-[14px] font-bold text-secondary mb-2">
                  Semester
                </label>
                <div className="relative">
                  <Layers className="absolute left-3.5 top-3.5 w-4 h-4 text-slate-400" />
                  <select
                    value={semester}
                    onChange={(e) => setSemester(Number(e.target.value))}
                    className="w-full pl-10 pr-3 py-3 bg-white border border-[#cbd5e1] rounded-[12px] text-secondary focus:outline-none focus:border-primary text-[14px]"
                  >
                    {[1, 2, 3, 4, 5, 6, 7, 8].map((s) => (
                      <option key={s} value={s}>Semester {s}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          )}

          {/* Identifier (Roll No / Employee ID) */}
          <div>
            <label className="block text-[14px] font-bold text-secondary mb-2">
              {role === "student" ? "Roll Number / USN" : "Employee / Faculty ID"}
            </label>
            <div className="relative">
              <Building className="absolute left-4 top-3.5 w-5 h-5 text-slate-400" />
              <input
                type="text"
                value={identifier}
                onChange={(e) => setIdentifier(e.target.value)}
                placeholder={role === "student" ? "1CS21001" : "EMP8902"}
                required
                className="w-full pl-12 pr-4 py-3 bg-white border border-[#cbd5e1] rounded-[12px] text-secondary placeholder:text-slate-400 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary text-[15px]"
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <label className="block text-[14px] font-bold text-secondary mb-2">
              Password
            </label>
            <div className="relative">
              <Lock className="absolute left-4 top-3.5 w-5 h-5 text-slate-400" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                className="w-full pl-12 pr-4 py-3 bg-white border border-[#cbd5e1] rounded-[12px] text-secondary placeholder:text-slate-400 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary text-[15px]"
              />
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isPending}
            className="w-full py-3.5 px-4 bg-primary hover:bg-blue-700 text-white font-bold text-[15px] rounded-[12px] shadow-[0_4px_10px_rgba(37,99,235,0.2)] transition-all mt-6 disabled:opacity-50 cursor-pointer border-none"
          >
            {isPending ? "Creating Account..." : "Create Account"}
          </button>
        </form>

        <div className="mt-6 text-center text-[15px] text-[#64748b]">
          Already have an account?{" "}
          <Link to="/login" className="text-primary hover:text-blue-700 font-bold no-underline">
            Sign In
          </Link>
        </div>
      </div>
    </div>
  );
}
