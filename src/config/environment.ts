const isDevelopment = process.env.NODE_ENV === 'development';

export const API_CONFIG = {
  development: {
    baseURL: 'http://localhost:3333',
    timeout: 10000,
  },
  production: {
    baseURL: 'https://api-gb-vowe.onrender.com',
    timeout: 15000,
  }
};

export const getApiConfig = () => {
  return isDevelopment ? API_CONFIG.development : API_CONFIG.production;
};

export const API_URL = isDevelopment 
  ? API_CONFIG.development.baseURL 
  : API_CONFIG.production.baseURL;
