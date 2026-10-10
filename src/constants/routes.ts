export const ROUTES = {
  // Auth
  LOGIN: "/login",
  REGISTER: "/register",

  // Student Portal
  STUDENT: {
    DASHBOARD: "/student/dashboard",
    MATERIALS: "/student/materials",
    ASSIGNMENTS: "/student/assignments",
    DOUBTS: "/student/doubts",
    NOTIFICATIONS: "/student/notifications",
    PROFILE: "/student/profile",
  },

  // Teacher Portal
  TEACHER: {
    DASHBOARD: "/teacher/dashboard",
    UPLOAD_NOTES: "/teacher/upload-notes",
    ASSIGNMENTS: "/teacher/assignments",
    SUBMISSIONS: "/teacher/submissions",
    DOUBTS: "/teacher/doubts",
    PROFILE: "/teacher/profile",
  },
} as const;
