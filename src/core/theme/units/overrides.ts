import { Overrides } from '@core/theme/types/main';

export const initializeOverrides = (config?: Overrides): Overrides => {
  return {
    ...config
  };
};