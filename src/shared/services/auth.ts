import { injectable } from '@core/ioc/utils';
import { BaseService } from '@core/services/base-service';
import { iocContainer } from '@core/ioc';
import { HTTPClient } from '@core/http-client';

@injectable()
export class AuthService extends BaseService {
  static diToken = Symbol('auth-service');

  protected urlPrefix = '/auth';

  private http = iocContainer.get<HTTPClient>(HTTPClient.diToken);

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
