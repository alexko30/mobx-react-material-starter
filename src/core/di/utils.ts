export * from 'inversify';
import { injectable } from 'inversify';

import { diContainer } from './di';
import { DiEntityIdentifier } from './types';

export const inject = <T>(identifier: DiEntityIdentifier) => {
  return diContainer.get<T>(identifier);
};

export { injectable };