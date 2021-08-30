import { DiEntityIdentifier } from '@core/di/types';

function createTokens<Key extends string>(
  x: Record<Key, DiEntityIdentifier>
) {
  return x;
}

export const DI_TOKENS = createTokens({
  configService: Symbol('config-service'),
  appHttpClientService: Symbol('app-http-client-service'),
  configHttpClientService: Symbol('config-http-client-service'),
  baseService: Symbol('base-service'),
  authService: Symbol('auth-service'),
  storageService: Symbol('storage-service'),
  loggerService: Symbol('logger-service'),
});