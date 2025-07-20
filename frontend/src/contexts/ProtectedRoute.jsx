import { Navigate } from "react-router-dom";
import { useAuth } from "./AuthContext";

export const ProtectedRoute = ({ children }) => {
  const { auth } = useAuth();
  return auth?.accessToken ? children : <Navigate to="/login" />;
};
