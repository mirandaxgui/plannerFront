import { useState, useEffect } from 'react';
import Cookies from 'js-cookie';

export function useAuth() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Verificar se o token existe nas cookies
    const token = Cookies.get('token');

    if (token) {
      setIsAuthenticated(true); // Se o token estiver presente, o usuário está autenticado
    } else {
      setIsAuthenticated(false); // Caso contrário, não está autenticado
    }

    setLoading(false); // Após a verificação, marca como "não carregando"
  }, []);

  return { isAuthenticated, loading };
}
