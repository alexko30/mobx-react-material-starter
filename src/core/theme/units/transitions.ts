import { TransitionsOptions } from '@core/theme/types/main';

export const initializeTransitions = (config?: TransitionsOptions): TransitionsOptions => {
  return {
    ...config
  };
};