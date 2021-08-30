import { appCreateStyles } from '@core/theme/utils/create-styles';

export function styles() { 
  return appCreateStyles({
    root: {
      height: '100%',
      minHeight: 400,
      maxHeight: '40vh'
    }, 
    heading: {},
  });
}