export type UserRole = "student" | "teacher" | "admin";

export interface User {
  id: number | string;
  name: string;
  email: string;
  role: "ROLE_STUDENT" | "ROLE_TEACHER" | "ROLE_ADMIN" | "student" | "teacher" | "admin";
  year?: number;
  semester?: number;
  department?: string;
  avatarUrl?: string;
  identifier?: string;
}

export function getNormalizedRole(role?: string | null): UserRole {
  if (!role) return "student";
  const normalized = role.toUpperCase();
  if (normalized === "ROLE_TEACHER" || normalized === "TEACHER") return "teacher";
  if (normalized === "ROLE_ADMIN" || normalized === "ADMIN") return "admin";
  return "student";
}
