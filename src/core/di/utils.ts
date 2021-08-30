import { injectable } from 'inversify';

import { diContainer } from './di';
import { DiEntity, DiEntityIdentifier } from './types';

export const appInject = <T>(identifier: DiEntityIdentifier) => {
  return diContainer.get<T>(identifier);
};

export const appRebind = (identifier: DiEntityIdentifier, entity: DiEntity) => {
  return diContainer
    .rebind(identifier)
    .to(entity)
    .inSingletonScope();
};

export { injectable as appInjectable };