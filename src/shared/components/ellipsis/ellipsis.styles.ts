import { appCreateStyles } from '@core/theme/utils/create-styles';

export function styles() {
  return appCreateStyles({
    root: {
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap',
      fontSize: 14,
    },
  });
}
