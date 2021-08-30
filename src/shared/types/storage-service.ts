import { CookieAttributes } from 'js-cookie';

export type StorageKey = string;

export type StorageType = 'cookie' | 'localStorage';

export type StorageSetOptions = CookieAttributes;

export interface IStorageService {
  get: <T = any>(type: StorageType, key: string) => T | undefined;
  remove: (type: StorageType, key: string) => void;
  set: (type: StorageType, key: string, value: any, options?: StorageSetOptions) => void;
}

export type { CookieAttributes };