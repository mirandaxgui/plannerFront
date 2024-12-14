import { useEffect, useState } from 'react';
import Cookies from 'js-cookie';

export function useAuth() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null); // Estado de autenticação (null para carregamento)
  const [loading, setLoading] = useState(true); // Estado de carregamento

  useEffect(() => {
    const token = Cookies.get('token'); // Obtém o token do cookie

    if (token) {
      setIsAuthenticated(true); // Usuário autenticado
    } else {
      setIsAuthenticated(false); // Usuário não autenticado
    }

    setLoading(false); // Após a verificação, define o carregamento como concluído
  }, []);

  return { isAuthenticated, loading }; // Retorna o estado de autenticação e carregamento
}
