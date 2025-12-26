import { Dashboard, Landing } from "@/pages";
import { Routes, Route, Navigate } from "react-router-dom";

function ProtectedRoute({ children }) {
  const isAuth = Boolean(localStorage.getItem("token"));
  return isAuth ? children : <Navigate to="/" replace />;
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
