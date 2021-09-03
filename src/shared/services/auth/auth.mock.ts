import { appInjectable } from '@core/di/utils';
import { TokenRefreshStatus } from '@shared/constants/auth';
import { UserMeModel } from '@shared/models/user/me-model';
import { IAuthService } from '@shared/types/auth-service';

@appInjectable()
export class AuthMockedService implements IAuthService {
  private _user: UserMeModel;
  private _tokenRefreshStatus: TokenRefreshStatus;

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

  refreshToken = async () => {}

  resetPassword: IAuthService['resetPassword'] = async (username) => {}
}
