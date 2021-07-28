import { DiEntityIdentifier } from '@core/di/types';

function createTokens<Key extends string>(
  x: Record<Key, DiEntityIdentifier>
) {
  return x;
}

export const DI_TOKENS = createTokens({
  config: Symbol('config'),
  httpClient: Symbol('http-client'),
  baseService: Symbol('base-service'),
  authService: Symbol('auth-service'),
});