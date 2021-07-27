import { AxiosInstance, AxiosRequestConfig, AxiosResponse, AxiosError, CancelTokenSource } from 'axios';

import { TokenRefreshStatus } from '@shared/constants/auth';

export interface HttpSuccessResponse<T> extends AxiosResponse<T> { };

export interface HttpFailResponse<T> extends AxiosError<T> { }

export type HttpRequestConfig = AxiosRequestConfig;
export type HttpInstance = AxiosInstance;
export type HttpCancelToken = CancelTokenSource;

export interface HttpConfig {
  defaults: HttpRequestConfig;
  getTokenRefreshStatus: () => TokenRefreshStatus;
  getAccessToken: () => string | undefined;
  refreshToken: () => Promise<any>;
  getUserLoginStatus?: () => boolean;
}

export interface IHttpClient {
  createInstance(): HttpInstance;
  get<T = unknown>(url: string, config?: HttpRequestConfig): Promise<HttpSuccessResponse<T>>;
	post<T = unknown>(url: string, body?: unknown, config?: HttpRequestConfig): Promise<HttpSuccessResponse<T>>;
	put<T = unknown>(url: string, body?: unknown, config?: HttpRequestConfig): Promise<HttpSuccessResponse<T>>;
	patch<T = unknown>(url: string, body?: unknown, config?: HttpRequestConfig): Promise<HttpSuccessResponse<T>>;
	delete<T = unknown>(url: string, config?: HttpRequestConfig): Promise<HttpSuccessResponse<T>>;
}