import axios from 'axios';
import Cookies from 'js-cookie';


export const api = axios.create({
  baseURL: 'https://guiplanner.hopto.org',
  withCredentials: true,
});
// Adiciona o token no header de todas as requisições
api.interceptors.request.use((config) => {
  const token = Cookies.get('token'); // Recupera o token do cookie

  if (token) {
    console.log(token)
    config.headers['Set-Cookie'] = `token=${token}`; // Adiciona o token ao header

  }

  return config;
});