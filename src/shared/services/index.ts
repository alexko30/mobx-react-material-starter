import { DiEntityIdentifier } from '@core/di/types';
import { DI_TOKENS } from '@shared/constants/di';

import { AuthService } from './auth';

export const sharedAppServices: Array<{ diToken: DiEntityIdentifier; entity: any }> = [
  { diToken: DI_TOKENS.authService, entity: AuthService },
];

export const sharedMockedServices: Array<{ diToken: DiEntityIdentifier; entity: any }> = [];