import { observable } from 'mobx';

import { appInject, appInjectable } from '@core/di/utils';
import { BaseService } from '@core/services/base';
import { DI_TOKENS } from '@shared/constants/di';
import { UserMeModel } from '@shared/models/user/me-model';
import { TokenRefreshStatus } from '@shared/constants/auth';
import { IHttpClientService } from '@shared/types/http-client';
import { IAuthService } from '@shared/types/auth-service';
import { appMakeObservable, appObservable } from '@core/state-management/utils';

@appInjectable()
export class AuthService extends BaseService implements IAuthService {
  protected urlPrefix = '/auth';

  private http = appInject<IHttpClientService>(DI_TOKENS.appHttpClientService);

  @observable private _user: UserMeModel;
  @observable private _tokenRefreshStatus: TokenRefreshStatus;

  constructor() {
    super();

    appMakeObservable(this, {
      _user: appObservable
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

  resetPassword: IAuthService['resetPassword'] = (username) => {
    return this.http.post<void>(this.getUrl('reset'), { email: username });
  }
}
