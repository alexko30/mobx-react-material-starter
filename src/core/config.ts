import { inject, injectable } from '@core/di/utils';
import { DI_TOKENS } from '@shared/constants/di';
import { IHttpClient } from '@shared/types/http-client';
import { ConfigType, IConfig } from '@shared/types/config';

@injectable()
export class Config implements IConfig {
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