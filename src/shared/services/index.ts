import { DI_TOKENS } from '@shared/constants/di';

import { AuthService } from './auth';

export const services = [
  {
    diToken: DI_TOKENS.authService,
    entity: AuthService,
  }
];