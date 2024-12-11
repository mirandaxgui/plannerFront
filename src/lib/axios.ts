import axios from 'axios';

export const api = axios.create({
  baseURL: import.meta.env.MODE === 'production'
    ? 'http://18.230.184.125:8080'  // URL do seu backend em produção
    : '/api',  // URL de proxy para desenvolvimento
  withCredentials: true,
});
