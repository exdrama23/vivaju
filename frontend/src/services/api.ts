import axios from 'axios';

export const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:2923';

const api = axios.create({
  baseURL: API_URL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const apiRequest = async (url: string, options: any = {}) => {
  const { method = 'GET', data, params } = options;
  try {
    const response = await api({
      url,
      method,
      data,
      params,
    });
    return response.data;
  } catch (error: any) {
    const message = error.response?.data?.message || error.response?.data?.error || 'Erro na requisição';
    throw new Error(message);
  }
};

export default api;
