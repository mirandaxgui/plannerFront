import { useEffect, useState } from 'react';
import Cookies from 'js-cookie';

export function useAuth() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);  // Estado de carregamento

  useEffect(() => {

    const token = Cookies.get('token');

    if (token) {
      setIsAuthenticated(true); // Define como autenticado se o token estiver presente
    } else {
      setIsAuthenticated(false); // Se não houver token, não está autenticado
    }

    // Marca como carregado
    setLoading(false);
  }, []); // Hook só será chamado uma vez ao montar o componente

  return { isAuthenticated, loading };
}
