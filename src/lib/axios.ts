import axios from 'axios';

export const api = axios.create({
  baseURL: import.meta.env.MODE === 'production'
    ? 'https://18.230.184.125:8080'  // URL do seu backend em produção
    : 'https://18.230.184.125:8080',  // URL de proxy para desenvolvimento
  withCredentials: true,
});
