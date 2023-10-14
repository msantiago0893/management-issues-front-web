import axios from 'axios';

const axiosApp = axios.create({
  baseURL: 'http://localhost:8081/api/v1/issue',
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default axiosApp;
