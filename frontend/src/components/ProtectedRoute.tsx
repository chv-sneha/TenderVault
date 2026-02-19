import { Navigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";

interface ProtectedRouteProps {
  children: React.ReactNode;
  requireAccountType?: "government" | "contractor";
}

export default function ProtectedRoute({ children, requireAccountType }: ProtectedRouteProps) {
  const { currentUser, accountType } = useAuth();

  if (!currentUser) {
    return <Navigate to="/login" replace />;
  }

  if (requireAccountType && accountType !== requireAccountType) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
}
