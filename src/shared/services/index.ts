import { DiEntityIdentifier } from '@core/di/types';
import { DI_TOKENS } from '@shared/constants/di';

import { AuthService } from './auth';
import { StorageService } from './storage';

export const sharedAppServices: Array<{ diToken: DiEntityIdentifier; entity: any }> = [
  {
    diToken: DI_TOKENS.authService,
    entity: AuthService,
  },
  {
    diToken: DI_TOKENS.storageService,
    entity: StorageService,
  }
];

export const sharedMockedServices: Array<{ diToken: DiEntityIdentifier; entity: any }> = [];