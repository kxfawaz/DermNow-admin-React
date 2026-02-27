import { Navigate, Outlet } from "react-router-dom"
import { useAuth } from "../provider/AuthProvider";


const ProtectedRoute = () => {
  const { token } = useAuth();
  console.log("ProtectedRoute rendered. token =", token);

  if (!token) {
    console.log("ProtectedRoute redirecting to /AdminLogin");
    return <Navigate to="/AdminLogin" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;