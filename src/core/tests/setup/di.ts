import { diContainer } from '@core/di';
import { sharedMockedServices } from '@shared/services';

export const initializeDi = () => {
  sharedMockedServices.forEach(({ entity, diToken }) => {
    diContainer
      .rebind(diToken)
      .to(entity)
      .inSingletonScope();
  });
};