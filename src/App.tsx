import { QueryClientProvider } from "@tanstack/react-query";
import AppRoutes from "@/routes/AppRoutes";
import LoadingSpinner from "@/components/Common/LoadingSpinner";
import { queryClient } from "@/config/queryClient";

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <AppRoutes />
      <LoadingSpinner />
    </QueryClientProvider>
  );
};

export default App;
