import axios from 'axios';

export interface APIError {
  code: number;
  error: string;
  message: string;
  description?: string;
}

export const api = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token && config.headers) {
    // eslint-disable-next-line no-param-reassign
    config.headers['x-access-token'] = token;
  }
  return config;
});
