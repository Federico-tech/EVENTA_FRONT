import axios from 'axios';
import { CONFIG } from '../../config';

axios.defaults.baseURL = CONFIG.API_URL;
axios.defaults.headers['Content-Type'] = 'application/json';
axios.interceptors.request.use(
  async (config) => {
    console.log({ config });
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

axios.interceptors.response.use(
  (response) => {
    return response;
  },
  async function (error) {
    return Promise.reject(error);
  },
);
