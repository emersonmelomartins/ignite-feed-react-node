import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

export function PrivateRoute() {
  const { signed } = useAuth();

  return signed ? <Outlet /> : <Navigate to="/" />;
}
