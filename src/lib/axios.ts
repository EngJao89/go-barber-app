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
    if (typeof window !== 'undefined') {
      const userToken = localStorage.getItem('authUserToken');
      const barberToken = localStorage.getItem('authBarberToken');
      
      if (userToken) {
        config.headers.Authorization = `Bearer ${userToken}`;
      } else if (barberToken) {
        config.headers.Authorization = `Bearer ${barberToken}`;
      } else {
        console.warn('⚠️ Nenhum token encontrado para a requisição:', config.url);
      }
    }
    
    return config;
  },
  (error) => {
    console.error('❌ Erro na requisição:', error);
    return Promise.reject(error instanceof Error ? error : new Error(String(error)));
  }
);

api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    const status = error.response?.status;
    const url = error.config?.url;
    
    console.error('❌ Erro na resposta:', {
      status,
      url,
      data: error.response?.data,
      message: error.message
    });
    
    // Tratar erro 401 (Unauthorized)
    if (status === 401 && typeof window !== 'undefined') {
      console.warn('⚠️ Token inválido ou expirado. Redirecionando para login...');
      
      // Limpar tokens inválidos
      localStorage.removeItem('authUserToken');
      localStorage.removeItem('authBarberToken');
      
      // Redirecionar para a página de login apropriada
      // Verificar qual token estava sendo usado para redirecionar corretamente
      const currentPath = window.location.pathname;
      
      if (currentPath.includes('barber') || currentPath.includes('dashboard-barber')) {
        window.location.href = '/login-barber';
      } else {
        window.location.href = '/';
      }
    }
    
    return Promise.reject(error instanceof Error ? error : new Error(String(error)));
  }
);

export default api;
