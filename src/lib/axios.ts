import axios from 'axios';

export const api = axios.create({
  baseURL: 'https://guiplanner.hopto.org',
  withCredentials: true,
});
