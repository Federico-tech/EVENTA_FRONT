import axios from "axios";

export const BASE_URL = 'https://eventa-back.herokuapp.com'

axios.baseURL = BASE_URL
axios.interceptors.request.use(function (config) {
    const token = 'token preso dallo stato'
    config.headers = {
        'Authorization': `Bearer ${token}`,
        'Accept': 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded'
    }
    // Do something before request is sent
    return config;
  }, function (error) {
    // Do something with request error
    return Promise.reject(error);
  });


axios.interceptors.request.use(function (config) {
  // Do something before request is sent
  return config;
}, function (error) {
    console.error({error})
  return Promise.reject(error);
});