import { Injectable } from '@angular/core';
import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import { ApiSuccessResponse } from '../../models/api-response.model';

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  private client: AxiosInstance;

  constructor() {
    this.client = axios.create({
      baseURL: 'https://localhost:7190/api',
      headers: {
        'Content-Type': 'application/json',
      },
      timeout: 5000,
    });
    this.client.interceptors.response.use(
      (response) => {
        return response.data;
      },
      (error) => {
        return Promise.reject(error.response?.data || error.message);
      }
    );
  }

  async get<T>(
    url: string,
    params?: Record<string, any>,
    config?: AxiosRequestConfig
  ): Promise<ApiSuccessResponse<T>> {
    const response = (await this.client.get<T>(url, {
      params: params,
      ...config,
    })) as T;
    const data: ApiSuccessResponse<T> = { success: true, data: response };
    return data;
  }

  async post<T>(
    url: string,
    body?: any,
    config?: AxiosRequestConfig
  ): Promise<ApiSuccessResponse<T>> {
    const response = (await this.client.post<T>(url, body, config)) as T;
    const data: ApiSuccessResponse<T> = { success: true, data: response };
    return data;
  }
}
