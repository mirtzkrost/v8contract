import { env } from "@/env";
import axios, { AxiosInstance, AxiosRequestConfig } from "axios";

const axiosInstance: AxiosInstance = axios.create({
  baseURL: env.VITE_API_URL,
  headers: {
    "Content-Type": "application/json",
    "x-contract-link-id": `${env.VITE_API_CONTRACT_LINK}`,
  },
});

axiosInstance.interceptors.request.use(async (reqConfig) => {
  const clone = { ...reqConfig };
  const urlParts = window.location.pathname.split("/");
  const id = urlParts[1];

  if (id) {
    clone.headers["x-contract-link-id"] = `${env.VITE_API_CONTRACT_LINK}`;
  }

  return clone;
});

type ApiResponse<T> = Promise<T>;

export const api = {
  GET: async <T>(url: string, config?: AxiosRequestConfig): ApiResponse<T> => {
    const response = await axiosInstance.get<T>(url, config);
    return response.data;
  },
  POST: async <T>(
    url: string,
    data?: unknown,
    config?: AxiosRequestConfig
  ): ApiResponse<T> => {
    const response = await axiosInstance.post<T>(url, data, config);
    return response.data;
  },
  PUT: async <T>(
    url: string,
    data?: unknown,
    config?: AxiosRequestConfig
  ): ApiResponse<T> => {
    const response = await axiosInstance.put<T>(url, data, config);
    return response.data;
  },
  PATCH: async <T>(
    url: string,
    data?: unknown,
    config?: AxiosRequestConfig
  ): ApiResponse<T> => {
    const response = await axiosInstance.patch<T>(url, data, config);
    return response.data;
  },
  DELETE: async <T>(
    url: string,
    config?: AxiosRequestConfig
  ): ApiResponse<T> => {
    const response = await axiosInstance.delete<T>(url, config);
    return response.data;
  },
};
