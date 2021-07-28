import { createStyles } from '@core/theme/utils/create-styles';
import { getScreenHeightSource } from '@shared/utils/layout';

export default function styles() {
  return createStyles({
    root: {
      height: getScreenHeightSource()
    },
  });
}