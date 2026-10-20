import React from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuthStore } from "@/store/useAuthStore";
import { getNormalizedRole, type UserRole } from "@/types/User";
import { ROUTES } from "@/constants";

interface ProtectedRouteProps {
  allowedRoles?: UserRole[];
  children?: React.ReactNode;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ allowedRoles, children }) => {
  const { isLoggedIn, user, token } = useAuthStore();
  const location = useLocation();

  if (!isLoggedIn || !token) {
    return <Navigate to={ROUTES.LOGIN} state={{ from: location }} replace />;
  }

  const role = getNormalizedRole(user?.role);

  if (allowedRoles && !allowedRoles.includes(role)) {
    // Redirect to user's assigned portal
    if (role === "teacher") {
      return <Navigate to={ROUTES.TEACHER.DASHBOARD} replace />;
    }
    if (role === "admin") {
      return <Navigate to={ROUTES.ADMIN.MASTER} replace />;
    }
    return <Navigate to={ROUTES.STUDENT.DASHBOARD} replace />;
  }

  return children ? <>{children}</> : <Outlet />;
};

export default ProtectedRoute;
