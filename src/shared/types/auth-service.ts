import { TokenRefreshStatus } from '@shared/constants/auth';

export interface IAuthService {
  loggedIn: boolean;
  refreshToken: () => Promise<void>;
  resetPassword: (username: string) => Promise<unknown>;
  tokenRefreshStatus: TokenRefreshStatus;
  tokens: {
    access: string;
    refresh: string;
  };
}
