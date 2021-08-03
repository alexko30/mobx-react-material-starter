import { createStyles } from '@core/theme/utils/create-styles';
import { getScreenHeightSource } from '@shared/utils/layout';

export function styles() {
  return createStyles({
    root: {
      height: getScreenHeightSource()
    },
  });
}