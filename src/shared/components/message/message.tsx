import * as React from 'react';

import { WithStyles, withStyles } from '@core/theme/utils/with-styles';
import { Grid } from '@shared/components/grid';

import { styles } from './message.styles';

export interface MessageConfig {
  heading?: React.ReactNode;
  subheading?: React.ReactNode;
  icon?: React.ReactNode;
}

export interface MessageProps extends WithStyles<typeof styles>, MessageConfig {}

const MessageComponent: React.FC<MessageProps> = (props) => {
  const { classes, heading, icon, subheading, ...otherProps } = props;

  return (
    <Grid
      container
      className={classes.root}
      justify="center"
      alignItems="center"
      direction="column"
      {...otherProps}
    >
      {heading && <Grid item>{<h4 className={classes.heading}>{heading}</h4>}</Grid>}
      {icon && <Grid item classes={{ root: classes.icon }}>{icon}</Grid>}
      {subheading && <Grid item>{<h4 className={classes.subheading}>{subheading}</h4>}</Grid>}
    </Grid>
  );
};

MessageComponent.defaultProps = {
  icon: null,
};

export const Message = withStyles(styles)(MessageComponent);
