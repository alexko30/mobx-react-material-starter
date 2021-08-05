import { inject, injectable } from '@core/di/utils';
import { DI_TOKENS } from '@shared/constants/di';
import { IStorageService } from '@shared/types/storage-service';
import { dateUtils } from '@shared/utils/date';
import { CachedEntity } from './cached-entity';

@injectable()
class CacheService {
  private storageService = inject<IStorageService>(DI_TOKENS.storageService);

  private config = {
    cacheTimeMinutes: 0,
  };

  initialize({ cacheTimeMinutes }: { cacheTimeMinutes: number }) {
    this.config.cacheTimeMinutes = cacheTimeMinutes;
  }

  get<T>(key: string) {
    return new Promise<void | T>((resolve) => {
      const entity = this.storageService.get('localStorage', key);

      if (!entity) {
        resolve();

        return;
      }

      const cachedEntity = new CachedEntity<T>(entity);

      if (cachedEntity.expired) {
        resolve();

        return;
      }
  
      resolve(cachedEntity.toJson().data);
    });
  }

  set<T>(key: string, data: T) {
    return new Promise<void>((resolve) => {
      const cachedEntity = new CachedEntity({
        data,
        expiredAt: dateUtils().add(this.config.cacheTimeMinutes, 'minutes').toISOString(),
      });
      this.storageService.set('localStorage', key, cachedEntity.toJson());

      resolve();
    });
  }
}

export { CacheService };