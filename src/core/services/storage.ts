import { set as setCookie, getJSON as getCookie, remove as removeCookie } from 'js-cookie';
import { set as setLocalStorage, get as getLocalStorage, remove as removeLocalStorage } from 'local-storage';

import { appInjectable } from '@core/di/utils';
import { IStorageService, StorageType, StorageKey, StorageSetOptions } from '@shared/types/storage-service';

type Methods = {
  get: <T>(key: StorageKey) => T | undefined;
  set: <T>(key: StorageKey, value: T, options?: StorageSetOptions) => void;
  remove: (key: StorageKey) => void;
};

@appInjectable()
export class StorageService implements IStorageService {
  private get methods(): Record<StorageType, Methods> {
    return {
      cookie: {
        get: getCookie,
        set: <T>(key: StorageKey, value: T, options?: StorageSetOptions) => setCookie(key, value as unknown as string, options),
        remove: (key) => removeCookie(key)
      },
      localStorage: {
        get: getLocalStorage,
        set: setLocalStorage,
        remove: removeLocalStorage,
      },
    };
  }

  get = <T>(type: StorageType, key: string) => {    
    return this.methods[type].get<T>(this.getStorageKey(key));
  }
  
  set = <T>(type: StorageType, key: string, value: T, options?: StorageSetOptions) => {
    const defaultOptions: Partial<Record<StorageType, StorageSetOptions>> = {
      cookie: { sameSite: 'Lax' },
    };

    this.methods[type].set<T>(
      this.getStorageKey(key), 
      value, 
      { 
        ...defaultOptions[type],
        ...options
      }
    );
  }
  
  remove: IStorageService['remove'] = (type, key) => {
    this.methods[type].remove(this.getStorageKey(key));
  }

  private getStorageKey(key: StorageKey) { 
    return `${window.location.origin}_${key}`;
  }
}
