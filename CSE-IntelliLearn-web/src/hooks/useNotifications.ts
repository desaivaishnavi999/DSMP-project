import { useState } from "react";
import type { NotificationItem } from "@/types";

const DEFAULT_NOTIFICATIONS: NotificationItem[] = [
  {
    id: "1",
    title: "New Assignment Posted",
    message: "A new assignment has been posted for Data Structure Using C.",
    time: "Today, 10:30 AM",
    icon: "📝",
    status: "New",
    unread: true,
  },
  {
    id: "2",
    title: "Assignment Checked",
    message: "Your Computer Network Assignment has been checked by the teacher.",
    time: "Yesterday, 4:15 PM",
    icon: "✅",
    status: "Checked",
    unread: true,
  },
  {
    id: "3",
    title: "New Study Material",
    message: "New notes have been uploaded for Operating System – Unit 1.",
    time: "2 days ago",
    icon: "📚",
    unread: false,
  },
  {
    id: "4",
    title: "Doubt Answered",
    message: "Your teacher has answered your doubt related to Data Structures.",
    time: "3 days ago",
    icon: "💬",
    unread: false,
  },
  {
    id: "5",
    title: "Assignment Deadline Reminder",
    message: "Your Data Structure Assignment is due on 05 October 2026.",
    time: "3 days ago",
    icon: "⏰",
    unread: false,
  },
];

export const useNotifications = (initialData = DEFAULT_NOTIFICATIONS) => {
  const [notifications, setNotifications] = useState<NotificationItem[]>(initialData);

  const markRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, unread: false } : n)),
    );
  };

  const unreadCount = notifications.filter((n) => n.unread).length;

  return { notifications, markRead, unreadCount };
};
