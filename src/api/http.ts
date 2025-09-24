import axios from 'axios';

const http = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5500/api',
  timeout: 10000
});

http.interceptors.request.use(cfg => {
  const token = localStorage.getItem('token');
  if (token) cfg.headers.Authorization = `Bearer ${token}`;
  return cfg;
});

http.interceptors.response.use(
  res => res,
  err => {
    const msg = err?.response?.data?.message || err.message || '网络错误';
    if (err?.response?.status === 401) localStorage.removeItem('token');
    return Promise.reject(new Error(msg));
  }
);

export default http;
