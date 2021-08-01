import { CookieAttributes } from 'js-cookie';

export interface IStorageService {
  getCookie: (key: string) => void;
  removeCookie: (key: string) => void;
  setCookie: (key: string, value: any, options?: CookieAttributes) => void;
}

export type { CookieAttributes };