import { AppShapeOptions } from '@core/theme/types/main';

export const initializeShape = (config?: AppShapeOptions): AppShapeOptions => {
  return {
    ...config
  };
};