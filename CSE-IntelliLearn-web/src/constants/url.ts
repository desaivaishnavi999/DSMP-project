export const API_URLS = {
  AUTH: {
    SIGNUP: "/auth/signup",
    LOGIN: "/auth/login",
    ME: "/auth/me",
  },
  ACADEMIC: {
    YEARS: "/years",
    SEMESTERS: (yearId: number | string) => `/semesters/${yearId}`,
    SUBJECTS: (semesterId: number | string) => `/subjects/${semesterId}`,
    UNITS: (subjectId: number | string) => `/units/${subjectId}`,
    TOPICS: (unitId: number | string) => `/topics/${unitId}`,
    TOPIC_BY_ID: (topicId: number | string) => `/topic/${topicId}`,
  },
  MATERIALS: {
    BY_TOPIC: (topicId: number | string) => `/materials/topic/${topicId}`,
    BY_UNIT: (unitId: number | string) => `/materials/unit/${unitId}`,
    ADD: "/materials",
  },
  PYQS: {
    BY_SUBJECT: (subjectId: number | string) => `/pyqs/${subjectId}`,
    ADD: "/pyqs",
  },
  ASSIGNMENTS: {
    ALL: "/assignments",
    DETAILS: "/assignments/details",
    BY_TOPIC: (topicId: number | string) => `/assignments/topic/${topicId}`,
    CREATE: "/assignments",
    SUBMISSIONS: (assignmentId: number | string) => `/submissions/${assignmentId}`,
    STUDENT_SUBMISSIONS: (studentId: number | string) => `/student-submissions/${studentId}`,
    SUBMIT: "/submissions",
    UPDATE_STATUS: (submissionId: number | string) => `/submissions/${submissionId}/status`,
  },
  FEEDBACK: {
    BY_SUBMISSION: (submissionId: number | string) => `/feedback/submission/${submissionId}`,
    ADD: "/feedback",
  },
  DOUBTS: {
    ALL: "/doubts",
    BY_STUDENT: (studentId: number | string) => `/doubts/student/${studentId}`,
    CREATE: "/doubts",
    ANSWER: (doubtId: number | string) => `/doubts/${doubtId}/answer`,
  },
  NOTIFICATIONS: {
    BY_USER: (userId: number | string) => `/notifications/${userId}`,
    CREATE: "/notifications",
    MARK_READ: (notificationId: number | string) => `/notifications/${notificationId}/read`,
  },
  FILES: {
    UPLOAD: "/files/upload",
  },
} as const;
