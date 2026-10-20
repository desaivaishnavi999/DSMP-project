import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "sonner";
import { ROUTES } from "@/constants";
import { useAuthStore } from "@/store/useAuthStore";
import { getNormalizedRole } from "@/types/User";

import Login from "@/pages/Auth/Login";
import Register from "@/pages/Auth/Register";
import DashboardLayout from "@/layouts/DashboardLayout";
import ProtectedRoute from "@/routes/protectedRoutes";

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

// Admin pages
import AdminMasterPage from "@/pages/Admin/AdminMasterPage";

const RootRedirect = () => {
  const { isLoggedIn, user } = useAuthStore();
  if (!isLoggedIn) return <Navigate to={ROUTES.LOGIN} replace />;
  const role = getNormalizedRole(user?.role);
  if (role === "teacher") return <Navigate to={ROUTES.TEACHER.DASHBOARD} replace />;
  if (role === "admin") return <Navigate to={ROUTES.ADMIN.MASTER} replace />;
  return <Navigate to={ROUTES.STUDENT.DASHBOARD} replace />;
};

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Root redirect */}
        <Route path="/" element={<RootRedirect />} />

        {/* Public Routes */}
        <Route path={ROUTES.LOGIN} element={<Login />} />
        <Route path={ROUTES.REGISTER} element={<Register />} />

        {/* Authenticated Routes wrapped in ProtectedRoute & DashboardLayout */}
        <Route element={<ProtectedRoute />}>
          <Route element={<DashboardLayout />}>
            {/* Student Portal */}
            <Route element={<ProtectedRoute allowedRoles={["student"]} />}>
              <Route path={ROUTES.STUDENT.DASHBOARD} element={<StudentDashboard />} />
              <Route path={ROUTES.STUDENT.MATERIALS} element={<StudyMaterials />} />
              <Route path={ROUTES.STUDENT.ASSIGNMENTS} element={<AssignmentsPage />} />
              <Route path={ROUTES.STUDENT.DOUBTS} element={<DoubtsPage />} />
              <Route path={ROUTES.STUDENT.PROFILE} element={<StudentProfile />} />
            </Route>

            {/* Shared Authenticated Routes */}
            <Route path={ROUTES.STUDENT.NOTIFICATIONS} element={<NotificationsPage />} />
            <Route path="/notifications" element={<NotificationsPage />} />

            {/* Teacher Portal */}
            <Route element={<ProtectedRoute allowedRoles={["teacher"]} />}>
              <Route path={ROUTES.TEACHER.DASHBOARD} element={<TeacherDashboard />} />
              <Route path={ROUTES.TEACHER.UPLOAD_NOTES} element={<UploadNotesPage />} />
              <Route path={ROUTES.TEACHER.ASSIGNMENTS} element={<CreateAssignmentPage />} />
              <Route path={ROUTES.TEACHER.SUBMISSIONS} element={<SubmissionsPage />} />
              <Route path={ROUTES.TEACHER.DOUBTS} element={<TeacherDoubtsPage />} />
              <Route path={ROUTES.TEACHER.PROFILE} element={<TeacherProfile />} />
            </Route>

            {/* Admin Master */}
            <Route element={<ProtectedRoute allowedRoles={["admin"]} />}>
              <Route path={ROUTES.ADMIN.MASTER} element={<AdminMasterPage />} />
            </Route>
          </Route>
        </Route>

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>

      <Toaster richColors position="top-right" closeButton />
    </BrowserRouter>
  );
};

export default AppRoutes;
