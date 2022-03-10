export interface IAuthService {
  refreshToken: () => Promise<void>;
  resetPassword: (username: string) => Promise<unknown>;
}
