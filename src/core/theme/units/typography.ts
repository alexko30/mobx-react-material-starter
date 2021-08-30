import { AppThemeOptions, AppTypographyOptions } from '@core/theme/types/main';

export const initializeTypography = (config?: AppThemeOptions['typography']): AppTypographyOptions => {
  return {
    ...config
  };
};