export interface Config {
  apiURL: {
    origin: string;
    prefix: string;
  };
  cache: {
    timeMinutes: number;
  };
  version: string;
}

export interface IConfigService {
  initialize: () => Promise<void>;
  get: () => Config;
  baseUrl: string;
}