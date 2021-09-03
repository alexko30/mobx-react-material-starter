import { Container } from 'inversify';

import { ConfigService } from '@core/services/config';
import { HttpClientService } from '@core/services/http-client';
import { BaseService } from '@core/services/base';
import { sharedAppServices } from '@shared/services';
import { DI_TOKENS } from '@shared/constants/di';
import { DiEntity, DiEntityIdentifier } from './types';
import { LoggerService } from '@core/services/logger';
import { StorageService } from '@core/services/storage';

const diContainer = new Container();

const entitiesConfig: Array<{ diToken: DiEntityIdentifier; entity: DiEntity }> = [
  { diToken: DI_TOKENS.configService, entity: ConfigService },
  { diToken: DI_TOKENS.appHttpClientService, entity: HttpClientService },
  { diToken: DI_TOKENS.configHttpClientService, entity: HttpClientService },
  { diToken: DI_TOKENS.baseService, entity: BaseService },
  { diToken: DI_TOKENS.loggerService, entity: LoggerService },
  { diToken: DI_TOKENS.storageService, entity: StorageService },
  ...sharedAppServices.map((x) => ({ diToken: x.diToken, entity: x.appEntity }))
];

entitiesConfig.forEach(({ diToken, entity }) => {
  diContainer
    .bind(diToken)
    .to(entity)
    .inSingletonScope();
});

export { diContainer }