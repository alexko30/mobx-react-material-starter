export interface ConfigType {
  apiURL: {
    origin: string;
    prefix: string;
  };
  cache: {
    timeMinutes: number;
  };
  version: string;
}

export interface IConfig {
  initialize: () => Promise<void>;
  get: () => ConfigType;
  baseUrl: string;
}