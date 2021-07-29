import Axios from 'axios';

import { HttpInstance, HttpRequestConfig, HttpConfig, HttpSuccessResponse, HttpFailResponse, IHttpClient } from './types';
import { browser } from '@shared/utils/browser';
import { TokenRefreshStatus } from '@shared/constants/auth';
import { injectable } from '@core/di/utils';

@injectable()
export class HttpClient implements IHttpClient {
	private _client: HttpInstance;
  private getAccessToken?: HttpConfig['getAccessToken'];
  private refreshToken?: HttpConfig['refreshToken'];
  private getTokenRefreshStatus?: HttpConfig['getTokenRefreshStatus'];

	constructor() {
		this._client = this.createClient();
	}

	setConfig(config: HttpConfig) {
		this.setClientConfig(config.defaults);
		this.refreshToken = config.refreshToken;
		this.getAccessToken = config.getAccessToken;
		this.getTokenRefreshStatus = config.getTokenRefreshStatus;
  }

	get<T = unknown>(url: string, config?: HttpRequestConfig): Promise<HttpSuccessResponse<T>> {
		return this._client.get<T>(url, config);
	}

	post<T = unknown>(url: string, body?: unknown, config?: HttpRequestConfig): Promise<HttpSuccessResponse<T>> {
		return this._client.post<T>(url, body, config);
	}

	put<T = unknown>(url: string, body?: unknown, config?: HttpRequestConfig): Promise<HttpSuccessResponse<T>> {
		return this._client.put<T>(url, body, config);
	}

	patch<T = unknown>(url: string, body?: unknown, config?: HttpRequestConfig): Promise<HttpSuccessResponse<T>> {
		return this._client.patch<T>(url, body, config);
	}

	delete<T = unknown>(url: string, config?: HttpRequestConfig): Promise<HttpSuccessResponse<T>> {
		return this._client.delete<T>(url, config);
	}

	generateCancelToken() {
    return Axios.CancelToken.source();
  }

  private createClient = () => {
    return Axios.create();
  }

  private get authHeader() {
    if (this.getAccessToken) {
      const accessToken = this.getAccessToken();
  
      return `Bearer ${accessToken}`;
    }

    return undefined;
  }

  private setClientConfig(defaults?: HttpConfig['defaults']) {
    if (defaults) {
      this.setDefaults(defaults);
    }

    this.setClientResponseInterceptor();
    this.setClientRequestInterceptor();
  }

  private setDefaults(defaults: HttpRequestConfig) {
    this._client.defaults.baseURL = defaults.baseURL;

    this._client.defaults.headers = {
      'Content-Type': 'application/json'
    };

    if (browser?.name === 'ie') {
      this._client.defaults.headers.Pragma = 'no-cache';
    }
  }

  private handleUnauthenticated = async (response: HttpSuccessResponse<any>) => {
    if (this.refreshToken) {
      await this.refreshToken();
    }

    if (!this.authHeader) {
      return;
    }

    response.config.headers.Authorization = this.authHeader;

    return this._client(response.config);
  }

  private setClientResponseInterceptor() {
    this._client.interceptors.response.use(
      (response: HttpSuccessResponse<any>) => {
        return { ...response, data: response.data.data || response.data };
      },
      async (error: HttpFailResponse<any>) => {
        const response = error ? error.response : undefined;

        if (!response) {
          return;
        }

        if (response.status === 401) {
          this.handleUnauthenticated(response);
        }

        if (response.status >= 500) { }

        throw error;
      }
    );
  }

  private setClientRequestInterceptor() {
    this._client.interceptors.request.use(
      (config: HttpRequestConfig): HttpRequestConfig => {
        if (!this.getAccessToken || !this.getTokenRefreshStatus) {
          return config;
        }

        const accessToken = this.getAccessToken();

        if (!accessToken || this.getTokenRefreshStatus() === TokenRefreshStatus.refreshing) {
          return config;
        }

        config.headers.Authorization = this.authHeader;

        return config;
      },
      (error: Error) => { 
        throw error; 
      }
    );
  }
}