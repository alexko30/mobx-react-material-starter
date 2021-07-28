import * as React from 'react';

import { Message } from '@shared/components/message';
import { withStyles, WithStyles } from '@core/theme/utils/with-styles';

import { styles } from './error-handler.styles';

export interface ErrorHandlerProps extends WithStyles<typeof styles> {
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

export const ErrorHandler = withStyles(styles)(ErrorHandlerComponent);