import { set as setCookie, getJSON as getCookie, remove as removeCookie } from 'js-cookie';
import { set as setLocalStorage, get as getLocalStorage, remove as removeLocalStorage } from 'local-storage';

import { appInjectable } from '@core/di/utils';
import { IStorageService, StorageType, StorageKey, StorageSetOptions } from '@shared/types/storage-service';

type Methods = {
  get: (key: StorageKey) => any | undefined;
  set: (key: StorageKey, value: any, options?: StorageSetOptions) => void;
  remove: (key: StorageKey) => void;
};

@appInjectable()
export class StorageService implements IStorageService {
  private get methods(): { [type in StorageType]: Methods } {
    return {
      cookie: {
        get: getCookie,
        set: setCookie,
        remove: (key) => removeCookie(key)
      },
      localStorage: {
        get: getLocalStorage,
        set: setLocalStorage,
        remove: removeLocalStorage,
      },
    };
  }

  get: IStorageService['get'] = (type, key) => {    
    return this.methods[type].get(this.getStorageKey(key));
  }
  
  set: IStorageService['set'] = (type, key, value, options) => {
    const defaultOptions: Partial<Record<StorageType, StorageSetOptions>> = {
      cookie: { sameSite: 'Lax' },
    };

    this.methods[type].set(
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
