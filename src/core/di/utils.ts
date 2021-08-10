export * from 'inversify';
import { injectable } from 'inversify';

import { diContainer } from './di';
import { DiEntity, DiEntityIdentifier } from './types';

export const inject = <T>(identifier: DiEntityIdentifier) => {
  return diContainer.get<T>(identifier);
};

export const rebind = (identifier: DiEntityIdentifier, entity: DiEntity) => {
  return diContainer
    .rebind(identifier)
    .to(entity)
    .inSingletonScope();
};

export { injectable };