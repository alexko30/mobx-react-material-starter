import { injectable } from '@core/ioc/utils';
import { IHttpClient } from './http-client/types';
import { BaseIocEntity } from './ioc/base-entity';

export interface ConfigType {
  apiURL: {
    origin: string;
    prefix: string;
  };
  version: string;
}

@injectable()
export class Config extends BaseIocEntity {
  static diToken = Symbol('config');

  private config: ConfigType;
  private httpClient: IHttpClient;

  initialize({ httpClient }: { httpClient: IHttpClient }) {
    this.httpClient = httpClient;

    return this.setConfig();
  }

  get() {
    return this.config;
  }

  private async setConfig() {
    const httpInstance = this.httpClient.createInstance();

    httpInstance.defaults.baseURL = window.location.origin;

    const { data } = await httpInstance.get('./public/config.json');

    this.config = data;
  }
}