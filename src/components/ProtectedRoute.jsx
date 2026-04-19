import { useAuth } from "../AuthStore/useAuth";
import { Navigate } from "react-router";

function ProtectedRoute({ children, allowedRoles }) {
  const { loading, currentUser, isAuthenticated } = useAuth();

  // 🔄 Wait for auth check
  if (loading) {
    return <p>Loading...</p>;
  }

  // 🔐 Not logged in
  if (!isAuthenticated || !currentUser) {
    return <Navigate to="/login" replace />;
  }

  // 🛡 Role check (SAFE)
  if (allowedRoles && !allowedRoles.includes(currentUser?.role)) {
    return <Navigate to="/unauthorized" replace state={{ redirectTo: "/" }} />;
  }

  return children;
}

export default ProtectedRoute;