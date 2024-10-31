import { AxiosAdapter } from './http/axios.adapter';

console.log(import.meta.env.VITE_API_URL);

export const schoolApiFetcher = new AxiosAdapter({
  baseURL: import.meta.env.VITE_API_URL,
})