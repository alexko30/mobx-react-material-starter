import { DiEntity, DiEntityIdentifier } from '@core/di/types';
import { DI_TOKENS } from '@shared/constants/di';

import { AuthService, AuthMockedService } from './auth';
import { UsersService, UsersMockedService } from './users';

export const sharedAppServices: Array<{ diToken: DiEntityIdentifier; appEntity: DiEntity; mockedEntity?: DiEntity }> = [
  { diToken: DI_TOKENS.authService, appEntity: AuthService, mockedEntity: AuthMockedService },
  { diToken: DI_TOKENS.usersService, appEntity: UsersService, mockedEntity: UsersMockedService },
];