import axios from "axios";

export const api = axios.create({
  baseURL: '/api', // Agora usa o proxy
  withCredentials: true,
});
