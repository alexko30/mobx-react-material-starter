import { AppMixinsOptions } from '@core/theme/types/main';

export const initializeMixins = (config?: AppMixinsOptions): AppMixinsOptions => {
  return {
    ...config
  };
};