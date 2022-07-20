import axios, { AxiosRequestConfig } from "axios";

axios.defaults.baseURL = process.env.API_BASE_URL;

export async function sendRawRequest<T, R>(
  method: "get" | "post" | "put" | "patch",
  url: string,
  data?: T,
  config?: AxiosRequestConfig<T>
) {
  if (method === "get") return axios.get<T, R>(url, config);
  return axios[method]<T, R>(url, data, config);
}
