import { Container } from 'inversify';

import { Config } from '@core/config';
import { HTTPClient } from '@core/http-client';
import { BaseService } from '@core/services/base-service';
import * as services from '@shared/services';

const iocContainer = new Container();

const entities = [
  Config, 
  HTTPClient,
  BaseService,
  ...Object.values(services),
];

entities.forEach((entity) => {
  iocContainer
    .bind(entity.diToken)
    .to(entity)
    .inSingletonScope();
});

export { iocContainer };