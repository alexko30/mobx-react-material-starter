import { Container, injectable } from 'inversify';

import { Config } from '@core/config';
import { HttpClient } from '@core/http-client';
import { BaseService } from '@core/services/base-service';
import { services } from '@shared/services';
import { DI_TOKENS } from '@shared/constants/di';
import { DiEntityIdentifier } from './types';

const diContainer = new Container();

const entitiesConfig: Array<{ diToken: DiEntityIdentifier; entity: any }> = [
  { diToken: DI_TOKENS.config, entity: Config },
  { diToken: DI_TOKENS.httpClient, entity: HttpClient },
  { diToken: DI_TOKENS.baseService, entity: BaseService },
  ...services
];

entitiesConfig.forEach(({ diToken, entity }) => {
  diContainer
    .bind(diToken)
    .to(entity)
    .inSingletonScope();
});

const inject = <T>(identifier: DiEntityIdentifier) => {
  debugger;

  return diContainer.get<T>(identifier);
};

export {
  inject,
  injectable
};