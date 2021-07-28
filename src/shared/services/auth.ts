import { makeObservable } from 'mobx';

import { inject, injectable } from '@core/di';
import { BaseService } from '@core/services/base-service';
import { DI_TOKENS } from '@shared/constants/di';
import { SystemUser } from '@shared/models/system-user';
import { TokenRefreshStatus } from '@shared/constants/auth';
import { IHttpClient } from '@core/http-client/types';

@injectable()
export class AuthService extends BaseService {
  protected urlPrefix = '/auth';

  private http = inject<IHttpClient>(DI_TOKENS.httpClient);

  private _user: SystemUser;
  private _tokenRefreshStatus: TokenRefreshStatus;

  constructor() {
    super();

    makeObservable(this, {
      
    });
  }

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

  activateAccount(data: { email: string; temporaryPassword: string; permanentPassword: string }) {
    const { email, temporaryPassword, permanentPassword } = data;

    return this.http.post(
      this.getUrl('set-permanent-password'),
      {
        email,
        permanentPassword,
        tempPassword: temporaryPassword
      }
    );
  }

  resetPassword(username: string) {
    return this.http.post(this.getUrl('reset'), { email: username });
  }
}
