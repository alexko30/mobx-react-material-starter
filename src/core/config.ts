import { inject, injectable } from '@core/di/utils';
import { DI_TOKENS } from '@shared/constants/di';
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
  private httpClient: IHttpClient = inject(DI_TOKENS.configHttpClient);

  initialize() {
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
    this.httpClient.setConfig({
      defaults: {
        baseURL: window.location.origin
      }
    });

    const { data } = await this.httpClient.get<ConfigType>('./public/config.json');

    this.config = data;
  }
}