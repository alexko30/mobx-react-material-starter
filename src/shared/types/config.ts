export interface ConfigType {
  apiURL: {
    origin: string;
    prefix: string;
  };
  version: string;
}

export interface IConfig {
  initialize: () => Promise<void>;
  get: () => ConfigType;
  baseUrl: string;
}