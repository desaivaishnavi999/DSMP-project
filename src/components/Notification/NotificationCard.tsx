import React from "react";
import type { NotificationItem } from "@/types";

// Re-export for any existing consumers that import this type from here
export type { NotificationItem };


interface NotificationCardProps {
  notification: NotificationItem;
  onMarkRead: (id: string) => void;
}

export const NotificationCard: React.FC<NotificationCardProps> = ({
  notification,
  onMarkRead,
}) => {
  return (
    <div
      className={`rounded-[14px] p-[20px] mb-[18px] flex items-start gap-[18px] shadow-[0_4px_15px_rgba(37,99,235,0.08)] border-l-[5px] border-[#2563eb] transition-all duration-300 hover:-translate-y-[3px] hover:shadow-[0_7px_20px_rgba(37,99,235,0.14)] ${
        notification.unread ? "bg-[#eef5ff]" : "bg-white"
      }`}
    >
      <div className="w-[48px] h-[48px] rounded-[50%] bg-[#dbeafe] text-[#2563eb] flex items-center justify-center text-[22px] shrink-0">
        {notification.icon}
      </div>

      <div className="flex-1">
        <h3 className="text-[#1e40af] font-bold text-[18px] mb-[7px] mt-0">
          {notification.title}
        </h3>
        <p className="text-[#475569] text-[16px] leading-[1.5] mb-[8px] mt-0">
          {notification.message}
        </p>
        <span className="text-[13px] text-[#94a3b8]">{notification.time}</span>
        <br />
        {notification.unread && notification.status && (
          <span className="bg-[#2563eb] text-white text-[11px] px-[9px] py-[4px] rounded-[20px] inline-block mt-[5px]">
            {notification.status}
          </span>
        )}
      </div>

      <button
        onClick={() => onMarkRead(notification.id)}
        disabled={!notification.unread}
        className={`border-none px-[12px] py-[7px] rounded-[7px] font-bold transition-colors ${
          notification.unread
            ? "bg-[#eff6ff] text-[#2563eb] hover:bg-[#dbeafe] cursor-pointer"
            : "bg-[#eff6ff] text-[#2563eb] opacity-[0.6] cursor-default"
        }`}
      >
        {notification.unread ? "Mark Read" : "Read"}
      </button>
    </div>
  );
};
