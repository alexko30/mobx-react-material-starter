import { DiEntityIdentifier } from '@core/di/types';

function createTokens<Key extends string>(
  x: Record<Key, DiEntityIdentifier>
) {
  return x;
}

export const DI_TOKENS = createTokens({
  config: Symbol('config'),
  appHttpClient: Symbol('app-http-client'),
  configHttpClient: Symbol('config-http-client'),
  baseService: Symbol('base'),
  authService: Symbol('auth-service'),
  storageService: Symbol('auth-service'),
  logger: Symbol('logger'),
  cacheService: Symbol('cache-service'),
});