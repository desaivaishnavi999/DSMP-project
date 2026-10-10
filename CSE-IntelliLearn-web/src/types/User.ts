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
