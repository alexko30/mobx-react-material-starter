import { appWithStyles, AppWithStyles } from '@core/theme/utils/with-styles';

import { Ellipsis, EllipsisProps } from '@shared/components/ellipsis';

import { styles } from './error-text.styles';

export interface ErrorTextProps extends AppWithStyles<typeof styles>, EllipsisProps {}

const ErrorTextComponent: React.FC<ErrorTextProps> = ({ classes, ...otherProps }) => {
  return <Ellipsis {...otherProps} classes={{ root: classes.root }} />;
};

export const ErrorText = appWithStyles(styles)(ErrorTextComponent);
