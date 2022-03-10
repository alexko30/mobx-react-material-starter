import { AppOverrides, AppPalette } from '@core/theme/types/main';

export const initializeButtonOverrides = (palette: AppPalette, config?: AppOverrides['MuiButton']): AppOverrides['MuiButton'] => {
  return {
    ...config,
    containedPrimary: {
      color: palette.common.white,
    },
  };
};
