// src/services/api.js
import axios from 'axios';

const api = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL,
  timeout: 5000, // optional: sets a 5s timeout
});

// Global response handler (optional UI fallback)
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // You can trigger a toast, log, or redirect
    if (!error.response) {
      console.error('Server unreachable. Try again or use cached data.');
    }
    return Promise.reject(error);
  }
);

export default api;
