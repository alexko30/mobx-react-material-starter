import { AppTransitionsOptions } from '@core/theme/types/main';

export const initializeTransitions = (config?: AppTransitionsOptions): AppTransitionsOptions => {
  return {
    ...config
  };
};