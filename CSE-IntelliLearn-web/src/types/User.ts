export interface User {
  id: string;
  name: string;
  email: string;
  role: "student" | "teacher" | "admin";
  department?: string;
  identifier?: string;
  avatarUrl?: string;
}
