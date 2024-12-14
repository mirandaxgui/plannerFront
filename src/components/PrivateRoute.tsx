import { Outlet } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth'; // Importando o hook de autenticação

export function PrivateRoute() {
  const { isAuthenticated, loading } = useAuth(); // Obtenção dos estados de autenticação e carregamento

  // Enquanto está carregando a autenticação, não renderiza nada
  if (loading) {
    return <div>Carregando...</div>; // Pode exibir um spinner ou mensagem de carregamento
  }

  // Se o usuário não estiver autenticado, exibe erro 403 ou redireciona para login
  if (isAuthenticated === false) {
    return (
      <div>
        <h1>403 - Forbidden</h1>
        <p>Você não tem permissão para acessar essa página.</p>
      </div>
    );
  }

  return <Outlet />; // Se autenticado, permite o acesso à página protegida
}
