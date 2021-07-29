import { injectable } from '@core/di/utils';

@injectable()
export class BaseService {
  protected urlPrefix = '';

  getUrl(path?: string | number) {
    if (!path) {
      return this.urlPrefix;
    }

    return `${this.urlPrefix}/${path}`;
  }
}
