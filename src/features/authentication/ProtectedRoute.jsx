import { Navigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import Spinner from "../../components/Spinner";

export default function ProtectedRoute({ children }) {
  const { authUser, isAuthUserLoading } = useAuth();

  if (isAuthUserLoading) {
    return <Spinner />;
  }

  if (!authUser || !authUser.isAdmin) {
    return <Navigate to="/" />;
  }

  return children;
}
