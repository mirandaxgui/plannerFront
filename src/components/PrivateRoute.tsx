import { Navigate } from "react-router-dom";

export function PrivateRoute({ children }: { children: JSX.Element }) {
  const isAuthenticated = true;  // Lógica de autenticação, altere conforme necessário.

  return isAuthenticated ? children : <Navigate to="/login" />;
}
