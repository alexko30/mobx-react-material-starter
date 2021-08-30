import { AppSvgIcon, AppSvgIconProps } from '@shared/components/svg-icon';
import { appWithStyles, AppWithStyles } from '@core/theme/utils/with-styles';

import { styles } from './support.styles';

interface Props extends Omit<AppSvgIconProps, 'classes'>, AppWithStyles<typeof styles> {}

const SupportIconComponent: React.FC<Props> = (props) => {
  return (
    <AppSvgIcon width="24" height="24" viewBox="0 0 24 24" fill="none" {...props}>
      <path d="M11.95 5C8.667 5 6 7.667 6 10.95C6 14.233 8.667 16.9 11.95 16.9H12.3V19C15.702 17.362 17.9 14.1 17.9 10.95C17.9 7.667 15.233 5 11.95 5ZM12.65 15.15H11.25V13.75H12.65V15.15ZM12.65 12.7H11.25C11.25 10.425 13.35 10.6 13.35 9.2C13.35 8.43 12.72 7.8 11.95 7.8C11.18 7.8 10.55 8.43 10.55 9.2H9.15C9.15 7.653 10.403 6.4 11.95 6.4C13.497 6.4 14.75 7.653 14.75 9.2C14.75 10.95 12.65 11.125 12.65 12.7Z" fill="#7D7D7D" />
    </AppSvgIcon>
  );
};

export const SupportIcon = appWithStyles(styles)(SupportIconComponent);