import { useAuth } from "../contexts/AuthContext"
import AuthPage from "./pages/AuthPage";

const ProtectedRoute = ({ children }) => {
  const { user } = useAuth();
  return user ? children : <AuthPage />;
};

export default ProtectedRoute;
