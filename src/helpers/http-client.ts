import Axios, { AxiosInstance } from 'axios';
import { environment } from '@/environment';
import { log } from '@/helpers/log';

const client = Axios.create({
  baseURL: environment.baseApiUrl,
});

client.interceptors.request.use((config) => {
  log(`${config.method} ...${config.url}`);
  return config;
}, (error) => {
  log(`Request failed: ${error}`);
  return Promise.reject(error);
});

export const HttpClient: AxiosInstance = client;
