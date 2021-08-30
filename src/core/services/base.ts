import { appInjectable } from '@core/di/utils';
import { IBaseService } from '@shared/types/base-service';

@appInjectable()
export class BaseService implements IBaseService {
  protected urlPrefix = '';

  getUrl(path?: string | number) {
    if (!path) {
      return this.urlPrefix;
    }

    return `${this.urlPrefix}/${path}`;
  }
}
