import { appCreateStyles } from '@core/theme/utils/create-styles';
import { AppTheme } from '@core/theme/types/main';

export const styles = ({ spacing }: AppTheme) =>
  appCreateStyles({
    root: {
      width: 28,
      height: 28,
      marginRight: spacing(2),
      fontWeight: 600,
      fontSize: 12,
      lineHeight: 1.2,
      textTransform: 'uppercase',
    },
    rootHidden: {
      display: 'none',
    },
  });
