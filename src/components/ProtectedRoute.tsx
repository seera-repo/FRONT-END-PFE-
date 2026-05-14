import { Navigate } from "react-router-dom";
import { getUser } from "../api/auth";

const ProtectedRoute = ({
  children,
  allowedRoles,
}: {
  children: React.ReactNode;
  allowedRoles?: string[];
}) => {
  const token = localStorage.getItem("token");
  const user = getUser();

  if (!token) return <Navigate to="/Login" />;

  if (allowedRoles && user && !allowedRoles.includes(user.role)) {
    // redirect to correct dashboard based on role
    if (user.role === "Teacher") return <Navigate to="/HomePageTeacher" />;
    if (user.role === "Student") return <Navigate to="/HomePage" />;
    if (user.role === "Admin") return <Navigate to="/BrowseCourse" />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;