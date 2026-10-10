import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@/config/api";
import { API_URLS } from "@/constants/url";
import { toast } from "sonner";

export interface MaterialPayload {
  topicId: number | string;
  title: string;
  description?: string;
  fileUrl?: string;
  fileName?: string;
  uploadedBy?: number | string;
}

export function useMaterialsByTopic(topicId?: number | string) {
  return useQuery({
    queryKey: ["materials", topicId],
    queryFn: async () => {
      if (!topicId) return [];
      const res = await api.get(API_URLS.MATERIALS.BY_TOPIC(topicId));
      return res.data;
    },
    enabled: !!topicId,
  });
}

export function useAddMaterial() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (payload: MaterialPayload) => {
      const res = await api.post(API_URLS.MATERIALS.ADD, payload);
      return res.data;
    },
    onSuccess: (_, variables) => {
      toast.success("Study material uploaded successfully!");
      queryClient.invalidateQueries({ queryKey: ["materials", variables.topicId] });
    },
    onError: (err: any) => {
      toast.error(err.response?.data?.message || "Failed to upload material");
    },
  });
}
