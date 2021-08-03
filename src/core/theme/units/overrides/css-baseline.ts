import { Overrides } from '@core/theme/types/main';

export const initializeCssBaselineOverrides = (config?: Overrides['MuiCssBaseline']): Overrides['MuiCssBaseline'] => {
  return {
    ...config,
    '@global': {
      '#root': {
        height: '100%',
      },
      a: {
        cursor: 'pointer'
      },
      input: {
        '&::-ms-clear, &::-ms-reveal': {
          display: 'none',
        },
      },
    },
  };
};