import { measureHeight } from 'react-div-100vh';

import { browser } from './browser';

export const CSS_VARIABLES = {
  appHeight: '--app-height'
};

export const getScreenHeight = () => {
  return measureHeight() as number;
};

export const getScreenHeightSource = () => {
  if (browser?.name === 'ie') {
    return '100vh';
  }

  return `var(${CSS_VARIABLES.appHeight})`;
};