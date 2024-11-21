import { useEffect, useState } from 'react';
import Cookies from 'js-cookie';

export function useAuth() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);  // Estado de carregamento

  useEffect(() => {

    const token = Cookies.get('token');

    if (token) {
      setIsAuthenticated(true); 
      setIsAuthenticated(false); 
    }

    // Marca como carregado
    setLoading(false);
  }, []); 

  return { isAuthenticated, loading };
}
