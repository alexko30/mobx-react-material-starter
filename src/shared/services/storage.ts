import { set as _setCookie, get as _getCookie, remove as _removeCookie, CookieAttributes } from 'js-cookie';

import { injectable } from '@core/di/utils';
import { BaseService } from '@core/services/base';

@injectable()
export class StorageService extends BaseService {
  getCookie(key: string) {
    return _getCookie(key);
  }
  
  setCookie(key: string, value: any, options?: CookieAttributes) {
    _setCookie(key, value, { sameSite: 'Lax', ...options });
  }
  
  removeCookie(key: string) {
    _removeCookie(key);
  }
  
  getStorageKey(key: string) { 
    return `${window.location.origin}_${key}`;
  }
}
