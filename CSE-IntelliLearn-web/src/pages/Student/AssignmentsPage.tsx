import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import type { Assignment } from "@/types";
import { ROUTES } from "@/constants";
import { useAuthStore } from "@/store/useAuthStore";
import { ClipboardList } from "lucide-react";

export default function AssignmentsPage() {
  const navigate = useNavigate();
  const { user } = useAuthStore();

  const [assignments] = useState<Assignment[]>([
    {
      id: "1",
      title: "Assignment 1: Implementation of Red-Black Trees",
      subject: "Data Structures",
      dueDate: "2026-10-15",
      status: "Pending",
      description: "Implement insertion and deletion operations in a Red-Black tree in C++/Java.",
    },
    {
      id: "2",
      title: "Assignment 2: SQL Query Optimization & Joins",
      subject: "DBMS",
      dueDate: "2026-10-10",
      status: "Submitted",
      description: "Submit PDF report analyzing execution plans for complex SQL joins.",
    },
    {
      id: "3",
      title: "Assignment 3: Process Scheduler Simulation",
      subject: "Operating Systems",
      dueDate: "2026-09-28",
      status: "Graded",
      description: "Simulate Round Robin and Round Robin with Feedback queue scheduling.",
      grade: "A (95/100)",
    },
  ]);

  return (
    <div className="min-h-screen bg-surface text-secondary font-sans">
      
      {/* MAIN */}
      <main className="max-w-[1200px] mx-auto mt-[35px] px-5 pb-10">
        <div className="bg-white p-[30px] rounded-[18px] shadow-[0_5px_20px_rgba(30,64,175,0.08)] mb-[30px] border-l-[5px] border-primary">
          <h1 className="m-0 text-secondary text-[25px] sm:text-[30px] font-bold flex items-center gap-3">
            <ClipboardList className="w-8 h-8 text-primary" />
            My Assignments
          </h1>
          <p className="mt-2.5 text-[#64748b] text-[16px]">
            View and submit your pending coursework.
          </p>
        </div>

        <div className="flex flex-col gap-[20px]">
          {assignments.map((item) => (
            <div
              key={item.id}
              className="bg-white p-[25px] rounded-[18px] shadow-[0_5px_20px_rgba(30,64,175,0.08)] border border-[#e1eaf8] flex flex-col md:flex-row justify-between items-start md:items-center gap-5 transition-all duration-250 hover:shadow-[0_10px_28px_rgba(30,64,175,0.15)] hover:border-[#93c5fd]"
            >
              <div className="flex-1">
                <div className="flex flex-wrap items-center gap-2 mb-2">
                  <span className="px-3 py-1 bg-[#eaf2ff] text-[#2563eb] text-[13px] font-bold rounded-md">
                    {item.subject}
                  </span>
                  {item.status === "Pending" && (
                    <span className="px-3 py-1 bg-[#fff3cd] text-[#856404] text-[13px] font-bold rounded-md border border-[#ffeeba]">
                      Due: {item.dueDate}
                    </span>
                  )}
                  {item.status === "Submitted" && (
                    <span className="px-3 py-1 bg-[#d4edda] text-[#155724] text-[13px] font-bold rounded-md border border-[#c3e6cb]">
                      Submitted
                    </span>
                  )}
                  {item.status === "Graded" && (
                    <span className="px-3 py-1 bg-[#d1ecf1] text-[#0c5460] text-[13px] font-bold rounded-md border border-[#bee5eb]">
                      Graded: {item.grade}
                    </span>
                  )}
                </div>
                <h3 className="m-0 text-[#12305b] text-[19px] font-bold mb-2">
                  {item.title}
                </h3>
                <p className="m-0 text-[#64748b] text-[15px] leading-relaxed">
                  {item.description}
                </p>
              </div>

              <div className="shrink-0 w-full md:w-auto">
                {item.status === "Pending" ? (
                  <button className="w-full md:w-auto px-6 py-2.5 bg-[#2563eb] text-white text-[15px] font-bold rounded-[8px] border-none cursor-pointer hover:bg-[#1d4ed8] transition-colors shadow-[0_4px_10px_rgba(37,99,235,0.2)] hover:-translate-y-[2px]">
                    Submit Work
                  </button>
                ) : (
                  <button
                    disabled
                    className="w-full md:w-auto px-6 py-2.5 bg-[#f1f5f9] text-[#94a3b8] text-[15px] font-bold rounded-[8px] border border-[#e2e8f0] cursor-not-allowed"
                  >
                    Completed
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>


      </main>

          </div>
  );
}
