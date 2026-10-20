import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@/config/api";
import { API_URLS } from "@/constants/url";
import { useAuthStore } from "@/store/useAuthStore";
import type { NotificationItem } from "@/types";

const getIconForType = (type: string) => {
  if (type === "ASSIGNMENT") return "📝";
  if (type === "FEEDBACK") return "✅";
  if (type === "MATERIAL") return "📚";
  if (type === "DOUBT") return "💬";
  return "🔔";
};

export const useNotifications = () => {
  const user = useAuthStore((s) => s.user);
  const queryClient = useQueryClient();

  const { data: notifications = [] } = useQuery({
    queryKey: ["notifications", user?.id],
    queryFn: async () => {
      if (!user?.id) return [];
      const res = await api.get(API_URLS.NOTIFICATIONS.BY_USER(user.id));
      return res.data.map((n: any): NotificationItem => ({
        id: n.notificationId.toString(),
        title: n.title,
        message: n.message,
        time: new Date(n.createdAt).toLocaleString(),
        icon: getIconForType(n.notificationType),
        status: n.isRead ? undefined : "New",
        unread: !n.isRead,
      }));
    },
    enabled: !!user?.id,
  });

  const { mutate: markReadMutation } = useMutation({
    mutationFn: async (id: string | number) => {
      await api.put(API_URLS.NOTIFICATIONS.MARK_READ(id));
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notifications", user?.id] });
    },
  });

  const markRead = (id: string) => {
    markReadMutation(id);
  };

  const unreadCount = notifications.filter((n: NotificationItem) => n.unread).length;

  return { notifications, markRead, unreadCount };
};
