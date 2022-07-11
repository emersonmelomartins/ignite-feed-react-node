import { ToastContainer } from "react-toastify";
import { MainRoutes } from "./routes";
import { AuthContextProvider } from "./contexts/AuthContext";

import Modal from "react-modal";

import "./global.css";
import "react-toastify/dist/ReactToastify.css";

Modal.setAppElement("#root");

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
        style={{zIndex: "99999999"}}
      />
      <MainRoutes />
    </AuthContextProvider>
  );
}
