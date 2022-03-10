import { AppOverrides, AppPalette } from '@core/theme/types/main';
import { initializeButtonOverrides } from './button';
import { initializeCssBaselineOverrides } from './css-baseline';

export const initializeOverrides = (palette: AppPalette, config?: AppOverrides): AppOverrides => {
  return {
    MuiCssBaseline: initializeCssBaselineOverrides(config?.MuiCssBaseline),
    MuiButton: initializeButtonOverrides(palette, config?.MuiButton),
    ...config,
  };
};
