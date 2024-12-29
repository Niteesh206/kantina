import axios from 'axios';

const api = axios.create({
  baseURL: 'http://192.168.217.101:5000/api',  // Use your local IP address here
});

export default api;
