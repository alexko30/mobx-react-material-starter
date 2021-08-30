import CoreSvgIcon, { SvgIconProps } from '@material-ui/core/SvgIcon';

export type { SvgIconProps as AppSvgIconProps };

export const AppSvgIcon: React.FC<SvgIconProps> = (props) => {
  return (
    <CoreSvgIcon {...props} />
  );
};