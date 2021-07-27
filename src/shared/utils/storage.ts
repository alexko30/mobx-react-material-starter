import { set as _setCookie, get as _getCookie, remove as _removeCookie, CookieAttributes } from 'js-cookie';

export const getCookie = (key: string) => {
  return _getCookie(key);
};

export const setCookie = (key: string, value: any, options?: CookieAttributes) => {
  _setCookie(key, value, { sameSite: 'Lax', ...options });
};

export const removeCookie = (key: string) => {
  _removeCookie(key);
};

export const getStorageKey = (key: string) => `${window.location.origin}_${key}`;