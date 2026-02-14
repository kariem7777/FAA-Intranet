/* eslint-disable @typescript-eslint/no-explicit-any */
import axios, {
  AxiosError,
  type AxiosInstance,
  type AxiosRequestConfig,
  type AxiosResponse,
} from 'axios';

import { msalInstance } from '../../features/authentication/services/msalInstance';
import { loginRequest } from '../../features/authentication/config/authConfig';
import { InteractionRequiredAuthError } from '@azure/msal-browser';

export class BaseApiService {
  protected api: AxiosInstance;

  constructor(baseURL: string = import.meta.env.VITE_BACKEND_URL || '/api/v1') {
    this.api = axios.create({
      baseURL,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    this.api.interceptors.request.use(
      async (config) => {
        config.headers['X-Email'] = 'admin@legis.gov';
        const account = msalInstance.getActiveAccount();
        if (account) {
          try {
            const response = await msalInstance.acquireTokenSilent({
              ...loginRequest,
              account: account,
            });
            const accessToken = response.accessToken;
            const idToken = response.idToken;
            console.log('🔑 Access Token attached to request:', accessToken);
            console.log('🔑 ID Token available:', idToken);

            config.headers.Authorization = `Bearer ${accessToken}`;
          } catch (error) {
            if (error instanceof InteractionRequiredAuthError) {
              console.error('Interaction required for token acquisition:', error);
            } else {
              console.error('Error acquiring token silently:', error);
            }
          }
        } else {
          console.warn('⚠️ No active account found in BaseApiService interceptor. Request will be sent without token.');
        }
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    this.api.interceptors.response.use(
      (response: AxiosResponse) => response,
      (error: AxiosError) => {
        const errorResponse = error.response?.data as any || error;
        return Promise.reject(errorResponse);
      },
    );
  }

  protected async get<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    const response: AxiosResponse<T> = await this.api.get(url, config);
    return response.data as T;
  }

  protected async post<T>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig,
  ): Promise<T> {
    const response: AxiosResponse<T> = await this.api.post(url, data, config);
    return response.data as T;
  }

  protected async put<T>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig,
  ): Promise<T> {
    const response: AxiosResponse<T> = await this.api.put(url, data, config);
    return response.data as T;
  }

  protected async postFormData<T>(
    url: string,
    data: FormData,
    config?: AxiosRequestConfig,
  ): Promise<T> {
    const response: AxiosResponse<T> = await this.api.post(url, data, {
      ...config,
      headers: {
        ...config?.headers,
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data as T;
  }

  protected async putFormData<T>(
    url: string,
    data: FormData,
    config?: AxiosRequestConfig,
  ): Promise<T> {
    const response: AxiosResponse<T> = await this.api.put(url, data, {
      ...config,
      headers: {
        ...config?.headers,
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data as T;
  }

  protected async delete<T>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig,
  ): Promise<T> {
    const response: AxiosResponse<T> = await this.api.delete(url, {
      ...config,
      data,
    });
    return response.data as T;
  }
}
