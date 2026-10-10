import React from "react";
import { Link } from "react-router-dom";
import { NotificationCard } from "@/components/Notification";
import { useNotifications } from "@/hooks";
import { ROUTES } from "@/constants";

export default function NotificationsPage() {
  const { notifications, markRead } = useNotifications();

  return (
    <div className="min-h-screen bg-[#f4f8ff] text-[#1e293b] font-sans">
      {/* Header */}
      <header className="bg-gradient-to-br from-[#2563eb] to-[#4f46e5] text-white py-[18px] px-[40px] flex justify-between items-center shadow-[0_4px_12px_rgba(0,0,0,0.12)]">
        <h1 className="text-[25px] font-bold m-0">CSE IntelliLearn</h1>
        <Link
          to={ROUTES.STUDENT.DASHBOARD}
          className="bg-white text-[#2563eb] px-[18px] py-[9px] rounded-[8px] font-bold hover:bg-[#eaf1ff] transition-colors no-underline"
        >
          ← Dashboard
        </Link>
      </header>

      {/* Main Content */}
      <div className="w-[90%] max-w-[1000px] mx-auto my-[35px]">
        <div className="text-center mb-[30px]">
          <h2 className="text-[#1d4ed8] text-[30px] font-bold mb-[8px] mt-0">Notifications</h2>
          <p className="text-[#64748b] m-0">Stay updated with your academic activities</p>
        </div>

        <div>
          {notifications.map((n) => (
            <NotificationCard key={n.id} notification={n} onMarkRead={markRead} />
          ))}

          {notifications.length === 0 && (
            <div className="text-center p-[50px] bg-white rounded-[14px] text-[#64748b]">
              <h3 className="text-[18px] font-bold mt-0">No Notifications</h3>
              <p className="m-0">You are all caught up!</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

