import { set as _setCookie, get as _getCookie, remove as _removeCookie } from 'js-cookie';

import { injectable } from '@core/di/utils';
import { BaseService } from '@core/services/base';
import { IStorageService } from '@shared/types/storage';

@injectable()
export class StorageService extends BaseService implements IStorageService {
  getCookie: IStorageService['getCookie'] = (key) => {
    return _getCookie(this.getStorageKey(key));
  }
  
  setCookie: IStorageService['setCookie'] = (key, value, options) => {
    _setCookie(this.getStorageKey(key), value, { sameSite: 'Lax', ...options });
  }
  
  removeCookie: IStorageService['removeCookie'] = (key) => {
    _removeCookie(this.getStorageKey(key));
  }
  
  private getStorageKey(key: string) { 
    return `${window.location.origin}_${key}`;
  }
}
