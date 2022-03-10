import { DiEntity, DiEntityIdentifier } from '@core/di/types';
import { DI_TOKENS } from '@shared/constants/di';

import { AuthService } from './auth';
import { UsersService } from './users';

export const sharedAppServices: Array<{ diToken: DiEntityIdentifier; entity: DiEntity }> = [
  { diToken: DI_TOKENS.authService, entity: AuthService },
  { diToken: DI_TOKENS.usersService, entity: UsersService },
];
