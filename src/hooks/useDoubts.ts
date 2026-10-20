import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@/config/api";
import { API_URLS } from "@/constants/url";
import { toast } from "sonner";

export interface CreateDoubtPayload {
  studentId: number | string;
  subjectId?: number | string;
  topicId?: number | string;
  title: string;
  question: string;
}

export interface AnswerDoubtPayload {
  doubtId: number | string;
  teacherId: number | string;
  answer: string;
}

export function useDoubts() {
  return useQuery({
    queryKey: ["doubts"],
    queryFn: async () => {
      const res = await api.get(API_URLS.DOUBTS.ALL);
      return res.data;
    },
  });
}

export function useStudentDoubts(studentId?: number | string) {
  return useQuery({
    queryKey: ["studentDoubts", studentId],
    queryFn: async () => {
      if (!studentId) return [];
      const res = await api.get(API_URLS.DOUBTS.BY_STUDENT(studentId));
      return res.data;
    },
    enabled: !!studentId,
  });
}

export function useCreateDoubt() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (payload: CreateDoubtPayload) => {
      const res = await api.post(API_URLS.DOUBTS.CREATE, payload);
      return res.data;
    },
    onSuccess: (_, variables) => {
      toast.success("Doubt submitted successfully!");
      queryClient.invalidateQueries({ queryKey: ["doubts"] });
      queryClient.invalidateQueries({ queryKey: ["studentDoubts", variables.studentId] });
    },
    onError: (err: any) => {
      toast.error(err.response?.data?.message || "Failed to submit doubt");
    },
  });
}

export function useAnswerDoubt() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ doubtId, teacherId, answer }: AnswerDoubtPayload) => {
      const res = await api.put(API_URLS.DOUBTS.ANSWER(doubtId), { teacher_id: teacherId, answer });
      return res.data;
    },
    onSuccess: () => {
      toast.success("Doubt answered successfully!");
      queryClient.invalidateQueries({ queryKey: ["doubts"] });
      queryClient.invalidateQueries({ queryKey: ["studentDoubts"] });
    },
    onError: (err: any) => {
      toast.error(err.response?.data?.message || "Failed to submit answer");
    },
  });
}
