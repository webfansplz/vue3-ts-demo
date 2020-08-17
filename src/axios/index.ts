import axios, {
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  Method,
  AxiosPromise,
} from "axios";
import { App, inject } from "vue";

axios.defaults.baseURL = process.env.VUE_APP_BASE_URL;

const http: AxiosInstance = axios.create();

http.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    return config;
  },
  (err: Error) => {
    return Promise.reject(err);
  }
);

http.interceptors.response.use(
  (response: AxiosResponse) => {
    return response;
  },
  (err: Error) => {
    return Promise.reject(err);
  }
);

const axiosName = Symbol();
// register to vue install method
export default function axiosInstall(vue: App) {
  vue.config.globalProperties.$axios = http;
  vue.provide<AxiosInstance>(axiosName, http);
}

export function useAxios(): AxiosInstance {
  return inject<AxiosInstance>(axiosName)!;
}

export function useRequest<D = any, Res = any>(
  url: string,
  data: D,
  type: Method
): AxiosPromise<Res> {
  const http = useAxios();
  return http({
    url,
    data: data || {},
    method: type,
  });
}
