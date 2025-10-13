import axios from 'axios'
import { getApiConfig } from '@/config/environment'

const config = getApiConfig();

const api = axios.create({
  baseURL: config.baseURL,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
  timeout: config.timeout,
});

api.interceptors.request.use(
  (config) => {
    console.log('🚀 Requisição:', config.method?.toUpperCase(), config.url);
    return config;
  },
  (error) => {
    console.error('❌ Erro na requisição:', error);
    return Promise.reject(error instanceof Error ? error : new Error(String(error)));
  }
);

api.interceptors.response.use(
  (response) => {
    console.log('✅ Resposta:', response.status, response.config.url);
    return response;
  },
  (error) => {
    console.error('❌ Erro na resposta:', error.response?.status, error.response?.data, error.message);
    return Promise.reject(error instanceof Error ? error : new Error(String(error)));
  }
);

export default api;
