import { AppBreakpointsOptions } from '@core/theme/types/main';

export const initializeBreakpoints = (config?: AppBreakpointsOptions): AppBreakpointsOptions => {
  return {
    ...config
  };
};