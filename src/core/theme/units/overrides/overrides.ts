import { Overrides } from '@core/theme/types/main';
import { initializeCssBaselineOverrides } from './css-baseline';

export const initializeOverrides = (config?: Overrides): Overrides => {
  return {
    ...initializeCssBaselineOverrides(config?.MuiCssBaseline),
    ...config,
  };
};