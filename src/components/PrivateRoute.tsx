
import { Outlet } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';  // Supondo que você tenha um hook de autenticação

export function PrivateRoute() {
  const { isAuthenticated } = useAuth();  // Verifique o estado de autenticação do usuário

  // Se o usuário não estiver autenticado, mostre o erro 403 ou redirecione para o login
  if (!isAuthenticated) {
    return (
      <div>
        <h1>403 - Forbidden</h1>
        <p>Você não tem permissão para acessar essa página.</p>
      </div>
    ); 
  }

  return <Outlet />;  // Se estiver autenticado, permite acessar as páginas filhas
}
