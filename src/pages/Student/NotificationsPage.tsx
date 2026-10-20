import React from "react";
import { Bell, CheckCheck } from "lucide-react";
import { NotificationCard } from "@/components/Notification";
import { useNotifications } from "@/hooks";

export default function NotificationsPage() {
  const { notifications, markRead, unreadCount } = useNotifications();

  return (
    <div className="min-h-screen bg-surface text-secondary font-sans flex flex-col">
      <main className="flex-1 max-w-4xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white p-[30px] rounded-[18px] shadow-[0_5px_20px_rgba(30,64,175,0.08)] mb-[30px] border-l-[5px] border-primary">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-[30px] font-bold text-secondary m-0 flex items-center gap-3">
                <Bell className="w-8 h-8 text-primary" />
                Academic Notifications
              </h1>
              <p className="mt-[10px] text-[#64748b] text-[16px] mb-0">
                Stay updated with assignments, evaluation feedback, doubts, and department announcements.
              </p>
            </div>
            {unreadCount > 0 && (
              <span className="px-3 py-1 rounded-full bg-primary-light text-primary text-[13px] font-bold">
                {unreadCount} New
              </span>
            )}
          </div>
        </div>

        <div className="space-y-4">
          {notifications.map((n) => (
            <NotificationCard key={n.id} notification={n} onMarkRead={markRead} />
          ))}

          {notifications.length === 0 && (
            <div className="text-center py-16 bg-white border border-[#e1eaf8] rounded-[18px] p-8 shadow-sm">
              <CheckCheck className="w-12 h-12 text-slate-300 mx-auto mb-3" />
              <h3 className="text-[18px] font-bold text-secondary mt-0 mb-1">No Notifications</h3>
              <p className="text-[#64748b] m-0">You are completely caught up with all academic notices!</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
