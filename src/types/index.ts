export * from "./User";

export interface Assignment {
  id: string;
  title: string;
  subject: string;
  dueDate: string;
  status: "Pending" | "Submitted" | "Graded";
  description: string;
  grade?: string;
}

export interface Doubt {
  id: string;
  studentName?: string;
  rollNumber?: string;
  subject: string;
  question: string;
  author?: string;
  status: "Open" | "Answered";
  answer?: string;
  answeredBy?: string;
  date: string;
}

export interface StudyMaterial {
  id: string;
  title: string;
  type: "Notes" | "PYQ" | "Syllabus";
  semester: string;
  subject: string;
  unit: string;
  author: string;
  date: string;
}

export interface NotificationMsg {
  id: string;
  title: string;
  date: string;
  type: string;
  message: string;
}

export interface Submission {
  id: string;
  studentName: string;
  rollNumber: string;
  assignmentTitle: string;
  submittedOn: string;
  status: "Pending Grade" | "Graded";
  grade?: string;
}

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  time: string;
  icon: string;
  status?: string;
  unread: boolean;
}
