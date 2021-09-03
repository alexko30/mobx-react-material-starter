import { CookieAttributes } from 'js-cookie';

export type StorageKey = string;

export type StorageType = 'cookie' | 'localStorage';

export type StorageSetOptions = CookieAttributes;

export interface IStorageService {
  get: <T = unknown>(type: StorageType, key: string) => T | undefined;
  remove: (type: StorageType, key: string) => void;
  set: <T = unknown>(type: StorageType, key: string, value: T, options?: StorageSetOptions) => void;
}

export type { CookieAttributes };