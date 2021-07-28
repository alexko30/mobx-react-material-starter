import { Theme } from '@core/theme/types/main';
import { createStyles } from '@core/theme/utils/create-styles';

export function styles({ spacing }: Theme) { 
  return createStyles({
    root: {
      padding: spacing(3, 0),
      minHeight: 100
    },
    icon: {},
    heading: {
      fontSize: 24,
      margin: spacing(0, 0, 1),
      textAlign: 'center',
    },
    subheading: {
      margin: 0,
      fontSize: 13,
      textAlign: 'center',
    },
  });
}
