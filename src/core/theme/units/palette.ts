import { PaletteOptions  } from '@core/theme/types/main';

export const initializePalette = (config?: PaletteOptions ): PaletteOptions  => {
  return {
    ...config,
  };
};