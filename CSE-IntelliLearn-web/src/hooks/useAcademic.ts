import { useQuery } from "@tanstack/react-query";
import { api } from "@/config/api";
import { API_URLS } from "@/constants/url";

export function useYears() {
  return useQuery({
    queryKey: ["academicYears"],
    queryFn: async () => {
      const res = await api.get(API_URLS.ACADEMIC.YEARS);
      return res.data;
    },
  });
}

export function useSemesters(yearId?: number | string) {
  return useQuery({
    queryKey: ["semesters", yearId],
    queryFn: async () => {
      if (!yearId) return [];
      const res = await api.get(API_URLS.ACADEMIC.SEMESTERS(yearId));
      return res.data;
    },
    enabled: !!yearId,
  });
}

export function useSubjects(semesterId?: number | string) {
  return useQuery({
    queryKey: ["subjects", semesterId],
    queryFn: async () => {
      if (!semesterId) return [];
      const res = await api.get(API_URLS.ACADEMIC.SUBJECTS(semesterId));
      return res.data;
    },
    enabled: !!semesterId,
  });
}

export function useUnits(subjectId?: number | string) {
  return useQuery({
    queryKey: ["units", subjectId],
    queryFn: async () => {
      if (!subjectId) return [];
      const res = await api.get(API_URLS.ACADEMIC.UNITS(subjectId));
      return res.data;
    },
    enabled: !!subjectId,
  });
}

export function useTopics(unitId?: number | string) {
  return useQuery({
    queryKey: ["topics", unitId],
    queryFn: async () => {
      if (!unitId) return [];
      const res = await api.get(API_URLS.ACADEMIC.TOPICS(unitId));
      return res.data;
    },
    enabled: !!unitId,
  });
}
