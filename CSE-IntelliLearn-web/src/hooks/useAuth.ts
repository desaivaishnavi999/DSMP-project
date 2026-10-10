import { useMutation } from "@tanstack/react-query";
import { api } from "@/config/api";
import { useAuthStore } from "@/store/useAuthStore";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { ROUTES, API_URLS } from "@/constants";
import type { User } from "@/types/User";

export interface RegisterPayload {
  name: string;
  email: string;
  password: string;
  role: "ROLE_STUDENT" | "ROLE_TEACHER" | "ROLE_ADMIN";
  year?: number | null;
  semester?: number | null;
}

export interface LoginPayload {
  email: string;
  password: string;
}

export interface AuthResponseData {
  token: string;
  tokenType: string;
  user: User;
}

export function useRegister() {
  const navigate = useNavigate();
  const login = useAuthStore((state) => state.login);

  return useMutation({
    mutationFn: async (payload: RegisterPayload) => {
      const response = await api.post<AuthResponseData>(API_URLS.AUTH.SIGNUP, payload);
      return response.data;
    },
    onSuccess: (data) => {
      login(data.user, data.token);
      toast.success("Account created successfully!");
      if (data.user.role === "ROLE_TEACHER" || data.user.role === "teacher") {
        navigate(ROUTES.TEACHER.DASHBOARD);
      } else {
        navigate(ROUTES.STUDENT.DASHBOARD);
      }
    },
    onError: (error: any) => {
      const msg = error.response?.data?.message || "Registration failed. Please try again.";
      toast.error(msg);
    },
  });
}

export function useLogin() {
  const navigate = useNavigate();
  const login = useAuthStore((state) => state.login);

  return useMutation({
    mutationFn: async (payload: LoginPayload) => {
      const response = await api.post<AuthResponseData>(API_URLS.AUTH.LOGIN, payload);
      return response.data;
    },
    onSuccess: (data) => {
      login(data.user, data.token);
      toast.success(`Welcome back, ${data.user.name}!`);
      if (data.user.role === "ROLE_TEACHER" || data.user.role === "teacher") {
        navigate(ROUTES.TEACHER.DASHBOARD);
      } else {
        navigate(ROUTES.STUDENT.DASHBOARD);
      }
    },
    onError: (error: any) => {
      const msg = error.response?.data?.message || "Invalid email or password";
      toast.error(msg);
    },
  });
}
