import { appInject, appInjectable } from '@core/di/utils';
import { BaseService } from '@core/services/base';
import { DI_TOKENS } from '@shared/constants/di';
import { IHttpClientService } from '@shared/types/http-client';
import { IAuthService } from '@shared/types/auth-service';

@appInjectable()
export class AuthService extends BaseService implements IAuthService {
  protected urlPrefix = '/auth';

  private http = appInject<IHttpClientService>(DI_TOKENS.appHttpClientService);

  async refreshToken() {}

  resetPassword: IAuthService['resetPassword'] = (username) => {
    return this.http.post<void>(this.getUrl('reset'), { email: username });
  };
}
