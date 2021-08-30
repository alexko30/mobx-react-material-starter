import { AppPaletteOptions  } from '@core/theme/types/main';

export const initializePalette = (config?: AppPaletteOptions): AppPaletteOptions  => {
  return {
    ...config
  };
};