// src/api/axiosInstance.js
import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

// Attach access token to requests
api.interceptors.request.use(config => {
  const token = localStorage.getItem('access_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Handle token refresh on 401
api.interceptors.response.use(
  res => res,
  async err => {
    const original = err.config;
    if (err.response?.status === 401 && !original._retry) {
      original._retry = true;
      try {
        const refresh = localStorage.getItem('refresh_token');

        // ✅ Use VITE_API_URL for token refresh too
        const refreshResponse = await axios.post(
          `${import.meta.env.VITE_API_URL}token/refresh/`,
          { refresh }
        );

        localStorage.setItem('access_token', refreshResponse.data.access);
        original.headers.Authorization = `Bearer ${refreshResponse.data.access}`;
        return api(original);
      } catch (refreshErr) {
        localStorage.clear();
        window.location.href = '/login';
      }
    }
    return Promise.reject(err);
  }
);

export default api;