import { diContainer } from '@core/di';
import { DiEntity } from '@core/di/types';
import { sharedAppServices } from '@shared/services';

export const initializeDi = () => {
  sharedAppServices
    .filter((x) => x.mockedEntity)
    .map((x) => ({ diToken: x.diToken, entity: x.mockedEntity }))
    .forEach(({ entity, diToken }) => {
      diContainer
        .rebind(diToken)
        .to(entity as DiEntity)
        .inSingletonScope();
    });
};