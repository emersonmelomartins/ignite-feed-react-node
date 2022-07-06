import { ToastContainer } from "react-toastify";
import { MainRoutes } from "./routes";
import { AuthContextProvider } from "./contexts/AuthContext";

import "./global.css";
import "react-toastify/dist/ReactToastify.css";

export function App() {
  return (
    <AuthContextProvider>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        newestOnTop={true}
        closeOnClick
        pauseOnHover
        theme="colored"
      />
      <MainRoutes />
    </AuthContextProvider>
  );
}
