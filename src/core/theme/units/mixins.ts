import { MixinsOptions } from '@core/theme/types/main';

export const initializeMixins = (config?: MixinsOptions): MixinsOptions => {
  return {
    ...config
  };
};