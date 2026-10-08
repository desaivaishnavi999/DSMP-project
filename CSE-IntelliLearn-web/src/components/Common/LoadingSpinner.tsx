import { useAuthStore } from "@/store/useAuthStore";
import Spinner from "./Spinner";

const LoadingSpinner = () => {
  const isLoading = useAuthStore((state) => state.isLoading);

  if (!isLoading) return null;

  return <Spinner />;
};

export default LoadingSpinner;
