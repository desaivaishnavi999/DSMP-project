import AppRoutes from "@/routes/AppRoutes";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { authStore, persistor } from "./store/auth.store";
import LoadingSpinner from "@/components/Common/LoadingSpinner";

import Chatbot from "@/components/Chatbot/Chatbot";

const queryClient = new QueryClient();

const App = () => {
  return (
    <Provider store={authStore}>
      <PersistGate loading={null} persistor={persistor}>
        <QueryClientProvider client={queryClient}>
          <AppRoutes />
          <LoadingSpinner />
          <Chatbot />
        </QueryClientProvider>
      </PersistGate>
    </Provider>
  );
};

export default App;
