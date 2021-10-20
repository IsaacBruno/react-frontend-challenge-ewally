import axios from 'axios';

const api = axios.create({
  baseURL: 'https://apidev.ewally.com.br'
});

const storagedToken = localStorage.getItem('@EwallyAuth:token');
// @ts-ignore
api.defaults.headers.Authorization = `Bearer ${storagedToken}`;

export default api;
