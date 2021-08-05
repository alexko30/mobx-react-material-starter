import { Container } from 'inversify';

import { Config } from '@core/config';
import { HttpClient } from '@core/http-client';
import { BaseService } from '@core/services/base';
import { sharedAppServices } from '@shared/services';
import { DI_TOKENS } from '@shared/constants/di';
import { DiEntityIdentifier } from './types';
import { Logger } from '@core/logger';
import { CacheService } from '@core/services/cache';
import { StorageService } from '@core/services/storage';

const diContainer = new Container();

const entitiesConfig: Array<{ diToken: DiEntityIdentifier; entity: any }> = [
  { diToken: DI_TOKENS.config, entity: Config },
  { diToken: DI_TOKENS.cacheService, entity: CacheService },
  { diToken: DI_TOKENS.appHttpClient, entity: HttpClient },
  { diToken: DI_TOKENS.configHttpClient, entity: HttpClient },
  { diToken: DI_TOKENS.baseService, entity: BaseService },
  { diToken: DI_TOKENS.logger, entity: Logger },
  { diToken: DI_TOKENS.storageService, entity: StorageService },
  ...sharedAppServices
];

entitiesConfig.forEach(({ diToken, entity }) => {
  diContainer
    .bind(diToken)
    .to(entity)
    .inSingletonScope();
});

export { diContainer }