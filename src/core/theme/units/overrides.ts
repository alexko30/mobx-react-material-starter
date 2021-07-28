import { Overrides } from '@core/theme/types/main';

export const initializeOverrides = (config?: Overrides): Overrides => {
  return {
    ...config,
    MuiCssBaseline: {
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
    },
  };
};