import { appCreateStyles } from '@core/theme/utils/create-styles';
import { getScreenHeightSource } from '@shared/utils/layout';

export function styles() {
  return appCreateStyles({
    root: {
      height: getScreenHeightSource()
    },
  });
}