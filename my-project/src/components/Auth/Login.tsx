import { useState } from "react";
function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !password || !role) {
      setMessage("Please fill all fields.");
      setMessageType("error");
      return;
    }
    if (role === "student") {
      window.location.href = "/student/student-dashboard.html";
    } else if (role === "teacher") {
      window.location.href = "/teacher/teacher-dashboard.html";
    } else if (role === "admin") {
      setMessage("Admin dashboard will be connected soon.");
      setMessageType("success");
    }
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-[#f8fbff] to-[#eaf2ff] p-5">
      {" "}
      {/* Main Wrapper */}{" "}
      <div className=" w-full max-w-[950px] min-h-[560px] bg-white rounded-[24px] overflow-hidden flex flex-col min-[751px]:flex-row shadow-[0_20px_60px_rgba(30,64,175,0.18)] ">
        {" "}
        {/* ================= LEFT SIDE ================= */}{" "}
        <div className=" relative w-full min-[751px]:w-[48%] bg-linear-to-br from-[#172554] via-[#1e3a8a] to-[#1d4ed8] text-white px-[30px] py-[35px] min-[751px]:px-[45px] min-[751px]:py-[55px] flex flex-col justify-center text-center min-[751px]:text-left overflow-hidden ">
          {" "}
          {/* Decorative Circle */}{" "}
          <div className=" absolute w-[280px] h-[280px] rounded-full bg-white/6 -top-[100px] -right-[100px] " />{" "}
          {/* Decorative Circle */}{" "}
          <div className=" absolute w-[220px] h-[220px] rounded-full bg-blue-400/10 -bottom-[100px] -left-[80px] " />{" "}
          {/* Content */}{" "}
          <div className="relative z-10">
            {" "}
            <div className="text-[58px] mb-[18px]"> 🎓 </div>{" "}
            <h1 className="text-[28px] min-[751px]:text-[34px] font-bold m-0">
              {" "}
              CSE IntelliLearn{" "}
            </h1>{" "}
            <p className="mt-[15px] text-[17px] leading-[1.6] text-blue-100">
              {" "}
              Smart learning and academic support platform for Computer Science
              students.{" "}
            </p>{" "}
            {/* Features */}{" "}
            <div className="mt-[25px] hidden min-[751px]:block">
              {" "}
              <div className="my-[13px] text-[15px] text-blue-50">
                {" "}
                📚 Unit-wise Study Materials{" "}
              </div>{" "}
              <div className="my-[13px] text-[15px] text-blue-50">
                {" "}
                📝 Previous Year Questions{" "}
              </div>{" "}
              <div className="my-[13px] text-[15px] text-blue-50">
                {" "}
                📋 Assignments & Submissions{" "}
              </div>{" "}
              <div className="my-[13px] text-[15px] text-blue-50">
                {" "}
                💡 Smart Learning Support{" "}
              </div>{" "}
            </div>{" "}
          </div>{" "}
        </div>{" "}
        {/* ================= RIGHT SIDE ================= */}{" "}
        <div className=" w-full min-[751px]:w-[52%] bg-white px-[30px] py-[35px] min-[751px]:px-[50px] min-[751px]:py-[55px] flex flex-col justify-center ">
          {" "}
          <h2 className="m-0 text-[30px] font-bold text-[#172554]">
            {" "}
            Welcome Back 👋{" "}
          </h2>{" "}
          <p className="mt-2 mb-[30px] text-[15px] text-slate-500">
            {" "}
            Login to continue your learning journey.{" "}
          </p>{" "}
          {/* ================= FORM ================= */}{" "}
          <form onSubmit={handleSubmit}>
            {" "}
            {/* Email */}{" "}
            <div className="mb-5">
              {" "}
              <label
                htmlFor="email"
                className=" block mb-2 text-[14px] font-bold text-slate-800 "
              >
                {" "}
                Email Address{" "}
              </label>{" "}
              <input
                id="email"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className=" w-full px-[15px] py-[14px] border border-slate-300 rounded-[10px] text-[15px] text-[#172554] outline-none bg-slate-50 transition-all focus:border-blue-600 focus:bg-white focus:ring-4 focus:ring-blue-600/10 "
              />{" "}
            </div>{" "}
            {/* Password */}{" "}
            <div className="mb-5">
              {" "}
              <label
                htmlFor="password"
                className=" block mb-2 text-[14px] font-bold text-slate-800 "
              >
                {" "}
                Password{" "}
              </label>{" "}
              <input
                id="password"
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className=" w-full px-[15px] py-[14px] border border-slate-300 rounded-[10px] text-[15px] text-[#172554] outline-none bg-slate-50 transition-all focus:border-blue-600 focus:bg-white focus:ring-4 focus:ring-blue-600/10 "
              />{" "}
            </div>{" "}
            {/* Role */}{" "}
            <div className="mb-5">
              {" "}
              <label
                htmlFor="role"
                className=" block mb-2 text-[14px] font-bold text-slate-800 "
              >
                {" "}
                Login As{" "}
              </label>{" "}
              <select
                id="role"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                required
                className=" w-full px-[15px] py-[14px] border border-slate-300 rounded-[10px] text-[15px] text-[#172554] outline-none bg-slate-50 transition-all focus:border-blue-600 focus:bg-white focus:ring-4 focus:ring-blue-600/10 "
              >
                {" "}
                <option value=""> Select Role </option>{" "}
                <option value="student"> Student </option>{" "}
                <option value="teacher"> Teacher </option>{" "}
                <option value="admin"> Admin </option>{" "}
              </select>{" "}
            </div>{" "}
            {/* Login Button */}{" "}
            <button
              type="submit"
              className=" w-full py-[14px] mt-[5px] border-0 rounded-[10px] bg-linear-to-br from-[#172554] to-[#2563eb] text-white text-[16px] font-bold cursor-pointer transition-all hover:-translate-y-0.5 hover:shadow-[0_8px_20px_rgba(37,99,235,0.25)] active:translate-y-0 "
            >
              {" "}
              Login{" "}
            </button>{" "}
            {/* Message */}{" "}
            <div
              className={` mt-[15px] text-center text-[14px] min-h-5 ${messageType === "error" ? "text-red-600" : "text-blue-600"} `}
            >
              {" "}
              {message}{" "}
            </div>{" "}
          </form>{" "}
          {/* Footer */}{" "}
          <div className=" mt-[25px] text-center text-slate-400 text-[13px] ">
            {" "}
            © 2026 CSE IntelliLearn <br /> Learn • Practice • Grow{" "}
          </div>{" "}
        </div>{" "}
      </div>{" "}
    </div>
  );
}


export default Login;
