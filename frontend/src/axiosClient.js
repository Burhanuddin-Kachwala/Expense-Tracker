// axiosClient.js
import axios from 'axios';

const axiosClient = axios.create({
  baseURL: 'http://127.0.0.1:8000/api', 
});

// Automatically attach the token from localStorage
axiosClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default axiosClient;
