import axios, {
  AxiosError, AxiosRequestConfig,
} from "axios";

interface IAuthResponse {
  accessToken: string;
  refreshToken: string;
  user: {
    accessToken: string,
    refreshToken: string,
    id: number,
    role: string,
    name: string,
    surname: string
  }
}

const $api = axios.create({
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
  baseURL: process.env.REACT_APP_API_URL
})

const authInterceptor = async (config: AxiosRequestConfig) => {
  if (config.headers) {
    config.headers.Authorization = `Bearer ${localStorage.getItem('accessToken')}`;
  }
  return config;
}

const authInterceptorReqError = async (error: AxiosError) => Promise.reject(error);

const authInterceptorResError = async (error: any) => {
  const originalRequest = error.config;
  if (error.response.status === 401 && error.config && !error.config._isRetry) {
    originalRequest._isRetry = true;
    try {
      const response = await axios.get<IAuthResponse>(`${process.env.REACT_APP_API_URL}/api/user/refresh`, { withCredentials: true })
      localStorage.setItem('token', response.data.accessToken);
      return $api.request(originalRequest);
    } catch (e) {
      console.log('Не авторизован.')
    }
  }
  throw error;
}

$api.interceptors.request.use(authInterceptor, authInterceptorReqError);
$api.interceptors.response.use(authInterceptor, authInterceptorResError)

export { $api }