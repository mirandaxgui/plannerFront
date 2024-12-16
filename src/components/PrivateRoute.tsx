import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

// Componente PrivateRoute que verifica a autenticação
export function PrivateRoute() {
  const { isAuthenticated, loading } = useAuth();

  // Enquanto estiver carregando, podemos retornar null ou um componente de loading
  if (loading) {
    return <div>Loading...</div>;  // Você pode personalizar esse loading
  }

  // Se o usuário não estiver autenticado, redireciona para o login
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // Se estiver autenticado, renderiza os componentes da rota
  return <Outlet />;
}
