import { ThemeOptions, TypographyOptions } from '@core/theme/types/main';

export const initializeTypography = (config?: ThemeOptions['typography']): TypographyOptions => {
  return {
    ...config
  };
};