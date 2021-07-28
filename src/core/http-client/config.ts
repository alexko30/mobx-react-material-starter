import Axios from 'axios';

import { HttpInstance, HttpRequestConfig, HttpConfig, HttpSuccessResponse, HttpFailResponse } from './types';
import { browser } from '@shared/utils/browser';
import { TokenRefreshStatus } from '@shared/constants/auth';

export class Http {
  private _client: HttpInstance;
  private getAccessToken: HttpConfig['getAccessToken'];
  private refreshToken: HttpConfig['refreshToken'];
  private getTokenRefreshStatus: HttpConfig['getTokenRefreshStatus'];

  constructor(config: HttpConfig) {
    this._client = this.createHttpClient();

    this.setClientConfig(config.defaults);

    this.refreshToken = config.refreshToken;
    this.getAccessToken = config.getAccessToken;
    this.getTokenRefreshStatus = config.getTokenRefreshStatus;
  }

  get client() {
    return this._client;
  }

  createHttpClient = () => {
    return Axios.create();
  }

  generateCancelToken = () => {
    return Axios.CancelToken.source();
  }

  private get authHeader() {
    const accessToken = this.getAccessToken();

    return `Bearer ${accessToken}`;
  }

  private setClientConfig(defaults: HttpConfig['defaults']) {
    this.setDefaults(defaults);
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
    await this.refreshToken();

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