import { AppTheme } from '@core/theme/types/main';
import { appAlpha } from '@core/theme/utils/alpha';
import { appCreateStyles } from '@core/theme/utils/create-styles';

export function styles({ spacing }: AppTheme) { 
  return appCreateStyles({
    root: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100%',
    },
    rootAbsolute: {
      position: 'absolute',
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
      zIndex: 3,
      backgroundColor: appAlpha('#fff', .5)
    },
    none: {
      margin: 0,
    },
    small: {
      margin: spacing(2),
    },
    normal: {
      margin: spacing(4),
    },
    big: {
      margin: spacing(6),
    },
    svg: {},
  });
}