import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:3000', // Your backend base URL
  timeout: 5000, // Timeout in milliseconds
  headers: {
    'Content-Type': 'application/json',
  },
});

export default axiosInstance;
