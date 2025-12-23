import { Navigate } from "react-router-dom";

// simple placeholder auth, customize with your real auth logic
const isAuthenticated = () => {
  return true; // change to actual condition
};

export default function ProtectedRoute({ children }) {
  if (!isAuthenticated()) {
    return <Navigate to="/upload" replace />;
  }
  return children;
}
