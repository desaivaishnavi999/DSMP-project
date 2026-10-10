import React from "react";
import { useNavigate } from "react-router-dom";
import { TeacherCard } from "@/components/Dashboard";
import { TEACHER_DASHBOARD_CARDS } from "@/constants";
import { useAuthStore } from "@/store/useAuthStore";
import { Hand } from "lucide-react";

export default function TeacherDashboard() {
  const navigate = useNavigate();
  const { user } = useAuthStore();

  return (
    <div className="min-h-screen bg-surface text-secondary font-sans flex flex-col">
      
      {/* MAIN CONTAINER */}
      <main className="flex-1 max-w-[1200px] mx-auto mt-[35px] mb-0 px-[20px] pb-[40px] w-full">
        <div className="bg-white p-[30px] rounded-[18px] shadow-[0_5px_20px_rgba(30,64,175,0.08)] mb-[30px] border-l-[5px] border-primary">
          <h1 className="text-[30px] font-bold text-secondary m-0 flex items-center gap-3">
            Welcome, {user?.name?.split(" ")[0] || "Teacher"} 
            <Hand className="w-8 h-8 text-primary" />
          </h1>
          <p className="mt-[10px] text-[#64748b] text-[16px] mb-0">
            Manage academic content, assignments, submissions, student doubts and notifications.
          </p>
        </div>

        {/* DASHBOARD CARDS */}
        <div className="grid grid-cols-1 min-[801px]:grid-cols-2 min-[1001px]:grid-cols-3 gap-[22px]">
          {TEACHER_DASHBOARD_CARDS.map((card, idx) => (
            <TeacherCard
              key={idx}
              title={card.title}
              icon={card.icon}
              onClick={() => navigate(card.route)}
            />
          ))}
        </div>
      </main>

          </div>
  );
}

