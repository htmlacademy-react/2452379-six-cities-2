import axios, { AxiosRequestConfig } from 'axios';
import { getToken } from './token';

const BACKEND_URL = 'https://13.design.htmlacademy.pro/six-cities';
const TIMEOUT = 5000;

export const createApi = () => {
  const api = axios.create({ baseURL: BACKEND_URL, timeout: TIMEOUT });

  api.interceptors.request.use(
    (requestConfig: AxiosRequestConfig) => {
      const token = getToken();

      if (token && requestConfig.headers) {
        requestConfig.headers['x-token'] = token;
      }

      return requestConfig;
    }
  );

  return api;
};
