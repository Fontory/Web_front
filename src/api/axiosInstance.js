import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://ceprj.gachon.ac.kr:60023',
});

axiosInstance.interceptors.request.use(config => {
  const token = localStorage.getItem('adminToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default axiosInstance;
