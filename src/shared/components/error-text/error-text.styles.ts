import { appCreateStyles } from '@core/theme/utils/create-styles';
import { AppTheme } from '@core/theme/types/main';

export const styles = ({ palette }: AppTheme) => {
  return appCreateStyles({
    root: {
      color: palette.error.main,
    },
  });
};
