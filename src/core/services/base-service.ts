import { injectable } from '@core/ioc/utils';
import { BaseIocEntity } from '@core/ioc/base-entity';

@injectable()
export class BaseService extends BaseIocEntity {
  static diToken = Symbol('base-service');

  protected urlPrefix = '';

  getUrl(path?: string | number) {
    if (!path) {
      return this.urlPrefix;
    }

    return `${this.urlPrefix}/${path}`;
  }
}
