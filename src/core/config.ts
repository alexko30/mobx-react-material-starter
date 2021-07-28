import { injectable } from '@core/di';
import { IHttpClient } from './http-client/types';

export interface ConfigType {
  apiURL: {
    origin: string;
    prefix: string;
  };
  version: string;
}

@injectable()
export class Config {
  private config: ConfigType;
  private httpClient: IHttpClient;

  initialize({ httpClient }: { httpClient: IHttpClient }) {
    this.httpClient = httpClient;

    return this.setConfig();
  }

  get() {
    return this.config;
  }

  get baseUrl() {
    const { apiURL } = this.config;

    return `${apiURL.origin}${apiURL.prefix}`;
  }

  private async setConfig() {
    const httpInstance = this.httpClient.createInstance();

    httpInstance.defaults.baseURL = window.location.origin;

    const { data } = await httpInstance.get('./public/config.json');

    this.config = data;
  }
}