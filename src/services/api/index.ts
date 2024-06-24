import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';

interface IAuthResponse {
  accessToken: string;
  refreshToken: string;
  user: {
    accessToken: string;
    refreshToken: string;
    id: string;
    role: string;
    name: string;
    surname: string;
  };
}

const logDev = (message: string) => {
  if (process.env.NODE_ENV === 'development') {
    console.log(message);
  }
};

const $api = axios.create({
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
  baseURL: process.env.REACT_APP_API_URL,
});

const $api_guest = axios.create({
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
  baseURL: process.env.REACT_APP_API_URL,
});

const $api_frontpad = axios.create({
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
  baseURL: 'https://app.frontpad.ru/api/index.php?',
});

const authInterceptor = async (config: any) => {
  if (config.headers) {
    const token = localStorage.getItem('accessToken');
    config.headers.Authorization = token ? `Bearer ${token}` : '';
  }
  return config;
};

const authInterceptorReqError = async (error: AxiosError) =>
  Promise.reject(error);

const authInterceptorResError = async (
  error: AxiosError
): Promise<AxiosError> => {
  if (axios.isAxiosError(error)) {
    const originalRequest = error.config as AxiosRequestConfig;
    const { message } = error;
    const { method, url } = originalRequest as AxiosRequestConfig;
    const { status, statusText } = (error.response as AxiosResponse) ?? {};

    try {
      const res = await axios.get<IAuthResponse>(
        `${process.env.REACT_APP_API_URL}api/auth/refresh`,
        {
          withCredentials: true,
        }
      );
      const { accessToken } = res.data;

      localStorage.setItem('accessToken', accessToken);
      // return $api.request(originalRequest);
    } catch (e) {
      logDev(
        `🚨 [API] ${method?.toUpperCase()} ${url} | Error ${status} ${message} (${statusText})`
      );
    }
  }
  return Promise.reject(error);
};

$api.interceptors.request.use(authInterceptor, authInterceptorReqError);
$api.interceptors.response.use(authInterceptor, authInterceptorResError);

$api_frontpad.interceptors.request.use(
  authInterceptor,
  authInterceptorReqError
);
$api_frontpad.interceptors.response.use(
  authInterceptor,
  authInterceptorResError
);

export { $api, $api_guest, $api_frontpad };
