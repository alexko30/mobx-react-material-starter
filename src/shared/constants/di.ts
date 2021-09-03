import { DiEntityIdentifier } from '@core/di/types';

function createTokens<Key extends string>(
  x: Record<Key, DiEntityIdentifier>
) {
  return x;
}

export const DI_TOKENS = createTokens({
  configService: 'config-service',
  appHttpClientService: 'app-http-client-service',
  configHttpClientService: 'config-http-client-service',
  baseService: 'base-service',
  authService: 'auth-service',
  storageService: 'storage-service',
  loggerService: 'logger-service',
  usersService: 'users-service',
});