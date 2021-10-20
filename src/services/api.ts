import axios from 'axios';

const api = axios.create({
  baseURL: 'https://apidev.ewally.com.br'
});

export default api;
