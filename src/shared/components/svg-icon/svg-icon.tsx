import * as React from 'react';
import CoreSvgIcon, { SvgIconProps } from '@material-ui/core/SvgIcon';

export type { SvgIconProps };

export const SvgIcon: React.FC<SvgIconProps> = (props) => {
  return (
    <CoreSvgIcon {...props} />
  );
};