import { Message } from '@shared/components/message';
import { appWithStyles, AppWithStyles } from '@core/theme/utils/with-styles';

import { styles } from './error-handler.styles';

export interface ErrorHandlerProps extends AppWithStyles<typeof styles> {
  heading?: React.ReactNode;
  icon?: React.ReactNode;
}

const ErrorHandlerComponent: React.FC<ErrorHandlerProps> = (props) => {
  const { classes, heading, icon } = props;

  return (
    <Message
      classes={{
        root: classes.root,
        heading: classes.heading,
      }}
      heading={heading}
      icon={icon}
    />
  );
}

export const ErrorHandler = appWithStyles(styles)(ErrorHandlerComponent);