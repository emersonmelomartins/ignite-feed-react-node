import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";
import { toast } from "react-toastify";

interface ApiError {
  statusCode: number;
  message: string;
}

export const api = axios.create({
  baseURL: "http://localhost:3333",
  headers: {
    "Content-Type": "application/json",
  },
});

const onRequest = (config: AxiosRequestConfig): AxiosRequestConfig => {
  let session = sessionStorage.getItem("APP::user-info");

  if (session) {
    const { token } = JSON.parse(session);
    config.headers!.Authorization = `Bearer ${token}`;
  }

  return config;
};

const onRequestError = (error: AxiosError): Promise<AxiosError> => {
  if (error.response) {
    const apiError = error.response.data as ApiError;
    toast.error(apiError.message);
  }
  return Promise.reject(error);
};

const onResponse = (response: AxiosResponse): AxiosResponse => {
  return response;
};

const onResponseError = (error: AxiosError): Promise<AxiosError> => {
  if (error.response) {
    const apiError = error.response.data as ApiError;
    toast.error(apiError.message);
  }
  return Promise.reject(error);
};

api.interceptors.request.use(onRequest, onRequestError);
api.interceptors.response.use(onResponse, onResponseError);
