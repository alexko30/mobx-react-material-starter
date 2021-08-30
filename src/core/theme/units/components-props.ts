import { AppComponentsProps } from '@core/theme/types/main';

export const initializeComponentsProps = (config?: AppComponentsProps): AppComponentsProps => {
  return {
    ...config,
  };
};