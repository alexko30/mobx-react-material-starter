import { SpacingOptions } from '@core/theme/types/main';

export const initializeSpacing = (value?: SpacingOptions): SpacingOptions => {
  return value || 4;
};