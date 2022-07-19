import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";
import { toast } from "react-toastify";
import { environmentUrl } from "../config";

interface ApiError {
  statusCode: number;
  message: string;
}

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

export const api = axios.create({
  baseURL: environmentUrl,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(onRequest, onRequestError);
api.interceptors.response.use(onResponse, onResponseError);
