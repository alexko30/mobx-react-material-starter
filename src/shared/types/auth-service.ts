import { TokenRefreshStatus } from '@shared/constants/auth';
import { HttpSuccessResponse } from './http-client';

export interface IAuthService {
  activateAccount: (data: { email: string; temporaryPassword: string; permanentPassword: string }) => Promise<HttpSuccessResponse<void>>;
  loggedIn: boolean;
  refreshToken: () => Promise<void>;
  resetPassword: (username: string) => Promise<HttpSuccessResponse<void>>;
  tokenRefreshStatus: TokenRefreshStatus;
  tokens: {
    access: string;
    refresh: string;
  };
}