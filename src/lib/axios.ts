import axios from 'axios';

export const api = axios.create({
  baseURL: import.meta.env.MODE === 'production'
    ? 'https://guiplanner.hopto.org:443'  // URL do seu backend em produção
    : 'https://guiplanner.hopto.org:443',  // URL de proxy para desenvolvimento
  withCredentials: true,
});
