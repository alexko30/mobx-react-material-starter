import { AppSpacingOptions } from '@core/theme/types/main';

export const initializeSpacing = (value?: AppSpacingOptions): AppSpacingOptions => {
  return value || 4;
};