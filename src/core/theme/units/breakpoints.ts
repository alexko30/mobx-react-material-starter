import { BreakpointsOptions } from '@core/theme/types/main';

export const initializeBreakpoints = (config?: BreakpointsOptions): BreakpointsOptions => {
  return {
    ...config
  };
};