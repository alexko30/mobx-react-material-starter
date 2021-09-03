import { AppWithStyles, appWithStyles } from '@core/theme/utils/with-styles';
import { AppGrid } from '@shared/components/grid';

import { styles } from './message.styles';

export interface MessageConfig {
  heading?: React.ReactNode;
  subheading?: React.ReactNode;
  icon?: React.ReactNode;
}

export interface MessageProps extends AppWithStyles<typeof styles>, MessageConfig {}

const MessageComponent: React.FC<MessageProps> = (props) => {
  const { classes, heading, icon, subheading, ...otherProps } = props;

  return (
    <AppGrid
      container
      className={classes.root}
      justifyContent="center"
      alignItems="center"
      direction="column"
      {...otherProps}
    >
      {heading && <AppGrid item>{<h4 className={classes.heading}>{heading}</h4>}</AppGrid>}
      {icon && <AppGrid item classes={{ root: classes.icon }}>{icon}</AppGrid>}
      {subheading && <AppGrid item>{<h4 className={classes.subheading}>{subheading}</h4>}</AppGrid>}
    </AppGrid>
  );
};

MessageComponent.defaultProps = {
  icon: null,
};

export const Message = appWithStyles(styles)(MessageComponent);
