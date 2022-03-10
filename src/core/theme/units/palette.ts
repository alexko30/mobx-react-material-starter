import { AppPaletteOptions } from '@core/theme/types/main';
import createPalette from '@material-ui/core/styles/createPalette';

export const initializePalette = (config?: AppPaletteOptions) => {
  return createPalette({
    ...config,
    primary: {
      main: '#214CE2',
    },
    secondary: {
      main: '#FFFFFF',
    },
    text: {
      primary: '#272D44',
      secondary: '#06144D',
      disabled: '#CFD1D7',
    },
    common: {
      black: '#000',
      white: '#fff',
    },
    grey: {
      50: '#EFF1FB',
      100: '#CFD1D7',
      200: '#959DBF',
      300: '#C1C3CF',
      400: '#babcc1',
      500: '#909296',
    },
    error: {
      main: '#FF0000',
    },
    warning: {
      main: '#FF7A00',
    },
    success: {
      main: '#00B295',
    },
    background: {
      paper: '#fff',
      default: '#F5F8FF',
    },
  });
};
