import axios from "axios";

const $host = axios.create({
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
  baseURL: process.env.REACT_APP_API_URL
})

const $authHost = axios.create({
  withCredentials: true,
  baseURL: process.env.REACT_APP_API_URL
})

const authInterceptor = (config: any) => {
  config.headers.authorization = `Bearer ${localStorage.getItem('accessToken')}`;
  return config;
}

const authInterceptorError = (error: any) => Promise.reject(error);

$authHost.interceptors.request.use(authInterceptor, authInterceptorError);

export {
  $host,
  $authHost
}