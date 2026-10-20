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

export interface SemesterItem {
  semesterId: number;
  semesterNumber: number;
  semesterName: string;
  yearId: number;
}

export const SEMESTERS: SemesterItem[] = [
  { semesterId: 1, semesterNumber: 1, semesterName: "Semester 1", yearId: 1 },
  { semesterId: 2, semesterNumber: 2, semesterName: "Semester 2", yearId: 1 },
  { semesterId: 3, semesterNumber: 3, semesterName: "Semester 3", yearId: 2 },
  { semesterId: 4, semesterNumber: 4, semesterName: "Semester 4", yearId: 2 },
  { semesterId: 5, semesterNumber: 5, semesterName: "Semester 5", yearId: 3 },
  { semesterId: 6, semesterNumber: 6, semesterName: "Semester 6", yearId: 3 },
  { semesterId: 7, semesterNumber: 7, semesterName: "Semester 7", yearId: 4 },
  { semesterId: 8, semesterNumber: 8, semesterName: "Semester 8", yearId: 4 },
];

export function getSemestersForYear(yearId?: number | string, yearName?: string): SemesterItem[] {
  if (!yearId) return SEMESTERS;
  const yNum = Number(yearId);
  let targetYear: number | null = yNum >= 1 && yNum <= 4 ? yNum : null;

  if (!targetYear && yearName) {
    const lower = yearName.toLowerCase();
    if (lower.includes("first") || lower.includes("1")) targetYear = 1;
    else if (lower.includes("second") || lower.includes("2")) targetYear = 2;
    else if (lower.includes("third") || lower.includes("3")) targetYear = 3;
    else if (lower.includes("fourth") || lower.includes("4")) targetYear = 4;
  }

  if (targetYear) {
    return SEMESTERS.filter((s) => s.yearId === targetYear);
  }
  return SEMESTERS;
}

export function useAllSemesters() {
  return useQuery({
    queryKey: ["allSemesters"],
    queryFn: async () => SEMESTERS,
    initialData: SEMESTERS,
  });
}

export function useSemesters(yearId?: number | string, yearName?: string) {
  return useQuery({
    queryKey: ["semesters", yearId, yearName],
    queryFn: async () => getSemestersForYear(yearId, yearName),
    initialData: () => getSemestersForYear(yearId, yearName),
  });
}

export function useAllSubjects() {
  return useQuery({
    queryKey: ["allSubjects"],
    queryFn: async () => {
      const res = await api.get(API_URLS.ACADEMIC.ALL_SUBJECTS);
      return res.data;
    },
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

export function useAllUnits() {
  return useQuery({
    queryKey: ["allUnits"],
    queryFn: async () => {
      const res = await api.get(API_URLS.ACADEMIC.ALL_UNITS);
      return res.data;
    },
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

export function useAllTopics() {
  return useQuery({
    queryKey: ["allTopics"],
    queryFn: async () => {
      const res = await api.get(API_URLS.ACADEMIC.ALL_TOPICS);
      return res.data;
    },
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
