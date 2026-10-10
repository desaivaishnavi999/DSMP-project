import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@/config/api";
import { API_URLS } from "@/constants/url";
import { toast } from "sonner";

export interface PyqPayload {
  subjectId: number | string;
  topicId?: number | string;
  examYear: number;
  title?: string;
  fileUrl?: string;
  fileName?: string;
  uploadedBy?: number | string;
}

export function usePyqsBySubject(subjectId?: number | string) {
  return useQuery({
    queryKey: ["pyqs", subjectId],
    queryFn: async () => {
      if (!subjectId) return [];
      const res = await api.get(API_URLS.PYQS.BY_SUBJECT(subjectId));
      return res.data;
    },
    enabled: !!subjectId,
  });
}

export function useAddPyq() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (payload: PyqPayload) => {
      const res = await api.post(API_URLS.PYQS.ADD, payload);
      return res.data;
    },
    onSuccess: (_, variables) => {
      toast.success("PYQ uploaded successfully!");
      queryClient.invalidateQueries({ queryKey: ["pyqs", variables.subjectId] });
    },
    onError: (err: any) => {
      toast.error(err.response?.data?.message || "Failed to upload PYQ");
    },
  });
}
