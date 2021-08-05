export interface ICacheService {
  initialize: (config: { cacheTimeMinutes: number }) => void;
  get: <T>(key: string) => Promise<undefined | T>;
  set: <T>(key: string, data: T) => Promise<void>;
}