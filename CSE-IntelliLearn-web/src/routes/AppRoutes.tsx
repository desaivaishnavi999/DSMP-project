import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "sonner";
import { ROUTES } from "@/constants";

import Login from "@/pages/Auth/Login";
import Register from "@/pages/Auth/Register";
import DashboardLayout from "@/layouts/DashboardLayout";

// Student pages
import StudentDashboard from "@/pages/Student/StudentDashboard";
import StudyMaterials from "@/pages/Student/StudyMaterials";
import AssignmentsPage from "@/pages/Student/AssignmentsPage";
import DoubtsPage from "@/pages/Student/DoubtsPage";
import NotificationsPage from "@/pages/Student/NotificationsPage";
import StudentProfile from "@/pages/Student/StudentProfile";

// Teacher pages
import TeacherDashboard from "@/pages/Teacher/TeacherDashboard";
import UploadNotesPage from "@/pages/Teacher/UploadNotesPage";
import CreateAssignmentPage from "@/pages/Teacher/CreateAssignmentPage";
import SubmissionsPage from "@/pages/Teacher/SubmissionsPage";
import TeacherDoubtsPage from "@/pages/Teacher/TeacherDoubtsPage";
import TeacherProfile from "@/pages/Teacher/TeacherProfile";

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route path={ROUTES.LOGIN} element={<Login />} />
        <Route path={ROUTES.REGISTER} element={<Register />} />

        {/* Authenticated Routes wrapped in Layout */}
        <Route element={<DashboardLayout />}>
          {/* Student Portal */}
          <Route path={ROUTES.STUDENT.DASHBOARD} element={<StudentDashboard />} />
          <Route path={ROUTES.STUDENT.MATERIALS} element={<StudyMaterials />} />
          <Route path={ROUTES.STUDENT.ASSIGNMENTS} element={<AssignmentsPage />} />
          <Route path={ROUTES.STUDENT.DOUBTS} element={<DoubtsPage />} />
          <Route path={ROUTES.STUDENT.NOTIFICATIONS} element={<NotificationsPage />} />
          <Route path={ROUTES.STUDENT.PROFILE} element={<StudentProfile />} />

          {/* Teacher Portal */}
          <Route path={ROUTES.TEACHER.DASHBOARD} element={<TeacherDashboard />} />
          <Route path={ROUTES.TEACHER.UPLOAD_NOTES} element={<UploadNotesPage />} />
          <Route path={ROUTES.TEACHER.ASSIGNMENTS} element={<CreateAssignmentPage />} />
          <Route path={ROUTES.TEACHER.SUBMISSIONS} element={<SubmissionsPage />} />
          <Route path={ROUTES.TEACHER.DOUBTS} element={<TeacherDoubtsPage />} />
          <Route path={ROUTES.TEACHER.PROFILE} element={<TeacherProfile />} />
        </Route>

        {/* Fallback */}
        <Route path="*" element={<Navigate to={ROUTES.LOGIN} replace />} />
      </Routes>

      <Toaster richColors position="top-right" closeButton />
    </BrowserRouter>
  );
};

export default AppRoutes;
