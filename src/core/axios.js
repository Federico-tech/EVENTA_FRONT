import axios from 'axios';

import { CONFIG } from '../config';
import { store } from '../store';
import { selectToken } from '../store/user';

axios.defaults.baseURL = CONFIG.API_URL;
axios.defaults.headers['Content-Type'] = 'application/json';
axios.interceptors.request.use(
  async (config) => {
    console.log({ config });
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axios.interceptors.response.use(
  (response) => {
    return response;
  },
  async function (error) {
    console.log({ error });
    return Promise.reject(error);
  }
);

export const mainAxios = axios.create({
  baseURL: CONFIG.API_URL,
  headers: {
    common: {
      'Content-Type': 'application/json',
    },
  },
});

mainAxios.interceptors.request.use(
  async (config) => {
    console.log({ config });
    const state = store.getState();
    const token = selectToken(state);
    config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);



mainAxios.interceptors.response.use(
  (response) => {
    return response;
  },
  async function (error) {
    console.log({ error });
    return Promise.reject(error);
  }
);

export const noAuthAxios = axios.create({
  baseURL: CONFIG.API_URL,
  headers: {
    common: {
      'Content-Type': 'application/json',
    },
  },
});
