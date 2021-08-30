import { AppOverrides } from '@core/theme/types/main';
import { initializeCssBaselineOverrides } from './css-baseline';

export const initializeOverrides = (config?: AppOverrides): AppOverrides => {
  return {
    ...initializeCssBaselineOverrides(config?.MuiCssBaseline),
    ...config,
  };
};