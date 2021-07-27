import { createStyles } from '@core/theme/utils/create-styles';
import { getScreenHeightSource } from '@shared/utils/layout';

export default function styles() {
  return createStyles({
    '@global': {
      '*': {
        margin: 0,
        padding: 0,
        border: 0,
        fontWeight: 400,
      },
      body: {},
      html: {},
      '#root': {
        height: '100%',
      },
      a: {
        textDecoration: 'none',
        cursor: 'pointer'
      },
      span: {},
      input: {
        '&::-ms-clear, &::-ms-reveal': {
          display: 'none',
        },
      },
    },
    root: {
      height: getScreenHeightSource()
    },
  });
}