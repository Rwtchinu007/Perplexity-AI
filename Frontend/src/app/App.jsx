import { RouterProvider } from "react-router";
import { router } from "./app.routes";
import { useAuth } from "../features/auth/hooks/useAuth";
import { useEffect } from "react";
function App() {
  const auth = useAuth();
  useEffect(() => {
    auth.handleGetMe();
    // this process is called hydration, where we fetch the user data from the backend and set it in the Redux store when the app loads. This ensures that the user remains logged in even after a page refresh.
  }, []);
  return <RouterProvider router={router} />;
}

export default App;
