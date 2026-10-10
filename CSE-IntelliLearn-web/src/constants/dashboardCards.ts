import { ROUTES } from "./routes";
import { BookOpen, FileText, ClipboardList, Lightbulb, Bell, User, Layers, CheckSquare, MessageSquare } from "lucide-react";
import type { LucideIcon } from "lucide-react";

export interface DashboardCardConfig {
  title: string;
  description: string;
  route: string;
  icon?: LucideIcon;
}

export interface StudentCardConfig extends DashboardCardConfig {
  icon: LucideIcon;
}

export const STUDENT_DASHBOARD_CARDS: StudentCardConfig[] = [
  {
    title: "Study Materials",
    description: "Access year-wise, semester-wise and unit-wise study materials.",
    icon: BookOpen,
    route: ROUTES.STUDENT.MATERIALS,
  },
  {
    title: "Previous Year Questions",
    description: "Practice previous year examination questions.",
    icon: FileText,
    route: ROUTES.STUDENT.MATERIALS,
  },
  {
    title: "Assignments",
    description: "View assignments and submit your work.",
    icon: ClipboardList,
    route: ROUTES.STUDENT.ASSIGNMENTS,
  },
  {
    title: "Doubts",
    description: "Ask questions and clear your academic doubts.",
    icon: Lightbulb,
    route: ROUTES.STUDENT.DOUBTS,
  },
  {
    title: "Notifications",
    description: "Check important academic updates and announcements.",
    icon: Bell,
    route: ROUTES.STUDENT.NOTIFICATIONS,
  },
  {
    title: "My Profile",
    description: "View and manage your student profile.",
    icon: User,
    route: ROUTES.STUDENT.PROFILE,
  },
];

/**
 * Teacher dashboard card definitions.
 */
export const TEACHER_DASHBOARD_CARDS: DashboardCardConfig[] = [
  {
    title: "Academic Content",
    description: "Manage years, semesters, subjects, units, topics and study material.",
    icon: Layers,
    route: ROUTES.TEACHER.UPLOAD_NOTES,
  },
  {
    title: "Assignments",
    description: "Create and manage assignments for students.",
    icon: ClipboardList,
    route: ROUTES.TEACHER.ASSIGNMENTS,
  },
  {
    title: "Submissions",
    description: "View student assignment submissions and give feedback.",
    icon: CheckSquare,
    route: ROUTES.TEACHER.SUBMISSIONS,
  },
  {
    title: "Student Doubts",
    description: "View and answer questions asked by students.",
    icon: MessageSquare,
    route: ROUTES.TEACHER.DOUBTS,
  },
  {
    title: "Notifications",
    description: "View important student and assignment notifications.",
    icon: Bell,
    route: ROUTES.STUDENT.NOTIFICATIONS,
  },
  {
    title: "Teacher Profile",
    description: "View teacher account and profile information.",
    icon: User,
    route: ROUTES.TEACHER.PROFILE,
  },
];
