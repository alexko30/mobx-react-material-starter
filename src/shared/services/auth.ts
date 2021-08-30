import { observable } from 'mobx';

import { appInject, appInjectable } from '@core/di/utils';
import { BaseService } from '@core/services/base';
import { DI_TOKENS } from '@shared/constants/di';
import { SystemUser } from '@shared/models/system-user';
import { TokenRefreshStatus } from '@shared/constants/auth';
import { IHttpClientService } from '@shared/types/http-client';
import { IAuthService } from '@shared/types/auth-service';

@appInjectable()
export class AuthService extends BaseService implements IAuthService {
  protected urlPrefix = '/auth';

  private http = appInject<IHttpClientService>(DI_TOKENS.appHttpClientService);

  @observable private _user: SystemUser;
  @observable private _tokenRefreshStatus: TokenRefreshStatus;

  get loggedIn() {
    return Boolean(this._user);
  }

  get tokenRefreshStatus() {
    return this._tokenRefreshStatus;
  }

  get tokens() {
    return {
      access: '',
      refresh: '',
    };
  }

  async refreshToken() {}

  activateAccount: IAuthService['activateAccount'] = (data) => {
    const { email, temporaryPassword, permanentPassword } = data;

    return this.http.post<void>(
      this.getUrl('set-permanent-password'),
      {
        email,
        permanentPassword,
        tempPassword: temporaryPassword
      }
    );
  }

  resetPassword: IAuthService['resetPassword'] = (username) => {
    return this.http.post<void>(this.getUrl('reset'), { email: username });
  }
}
