import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@/config/api";
import { API_URLS } from "@/constants/url";
import { toast } from "sonner";

export interface CreateAssignmentPayload {
  title: string;
  description?: string;
  subjectId: number | string;
  unitId?: number | string;
  topicId?: number | string;
  teacherId: number | string;
  dueDate: string;
}

export interface SubmitAssignmentPayload {
  assignmentId: number | string;
  studentId: number | string;
  fileUrl?: string;
  fileName?: string;
}

export interface FeedbackPayload {
  submissionId: number | string;
  teacherId: number | string;
  marks?: number;
  feedbackText?: string;
}

export function useAssignments() {
  return useQuery({
    queryKey: ["assignments"],
    queryFn: async () => {
      const res = await api.get(API_URLS.ASSIGNMENTS.ALL);
      return res.data;
    },
  });
}

export function useCreateAssignment() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (payload: CreateAssignmentPayload) => {
      const res = await api.post(API_URLS.ASSIGNMENTS.CREATE, payload);
      return res.data;
    },
    onSuccess: () => {
      toast.success("Assignment created successfully!");
      queryClient.invalidateQueries({ queryKey: ["assignments"] });
    },
    onError: (err: any) => {
      toast.error(err.response?.data?.message || "Failed to create assignment");
    },
  });
}

export function useSubmissionsByAssignment(assignmentId?: number | string) {
  return useQuery({
    queryKey: ["submissions", assignmentId],
    queryFn: async () => {
      if (!assignmentId) return [];
      const res = await api.get(API_URLS.ASSIGNMENTS.SUBMISSIONS(assignmentId));
      return res.data;
    },
    enabled: !!assignmentId,
  });
}

export function useStudentSubmissions(studentId?: number | string) {
  return useQuery({
    queryKey: ["studentSubmissions", studentId],
    queryFn: async () => {
      if (!studentId) return [];
      const res = await api.get(API_URLS.ASSIGNMENTS.STUDENT_SUBMISSIONS(studentId));
      return res.data;
    },
    enabled: !!studentId,
  });
}

export function useSubmitAssignment() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (payload: SubmitAssignmentPayload) => {
      const res = await api.post(API_URLS.ASSIGNMENTS.SUBMIT, payload);
      return res.data;
    },
    onSuccess: (_, variables) => {
      toast.success("Assignment submitted successfully!");
      queryClient.invalidateQueries({ queryKey: ["studentSubmissions", variables.studentId] });
      queryClient.invalidateQueries({ queryKey: ["submissions", variables.assignmentId] });
    },
    onError: (err: any) => {
      toast.error(err.response?.data?.message || "Failed to submit assignment");
    },
  });
}

export function useAddFeedback() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (payload: FeedbackPayload) => {
      const res = await api.post(API_URLS.FEEDBACK.ADD, payload);
      return res.data;
    },
    onSuccess: (_, variables) => {
      toast.success("Feedback added & assignment marked as checked!");
      queryClient.invalidateQueries({ queryKey: ["submissions"] });
      queryClient.invalidateQueries({ queryKey: ["studentSubmissions"] });
    },
    onError: (err: any) => {
      toast.error(err.response?.data?.message || "Failed to submit feedback");
    },
  });
}
