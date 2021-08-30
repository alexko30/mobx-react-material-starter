import { appInject, appInjectable } from '@core/di/utils';
import { DI_TOKENS } from '@shared/constants/di';
import { IHttpClientService } from '@shared/types/http-client';
import { Config, IConfigService } from '@shared/types/config-service';

@appInjectable()
export class ConfigService implements IConfigService {
  private config: Config;
  private httpClient = appInject<IHttpClientService>(DI_TOKENS.configHttpClientService);

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

    const { data } = await this.httpClient.get<Config>('./public/config.json');

    this.config = data;
  }
}