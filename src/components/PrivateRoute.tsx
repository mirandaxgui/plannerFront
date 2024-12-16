import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

export function PrivateRoute() {
  const { isAuthenticated, loading } = useAuth();

  // Enquanto estiver carregando, podemos exibir um componente de loading
  if (loading) {
    return <div>Loading...</div>;
  }

  // Se o usuário não estiver autenticado, redireciona para o login
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // Se estiver autenticado, renderiza o conteúdo da rota
  return <Outlet />;
}
