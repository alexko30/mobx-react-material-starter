import * as React from 'react';
import CircularProgress, { CircularProgressProps } from '@material-ui/core/CircularProgress';
import cx from 'classnames';

import { withStyles, WithStyles } from '@core/theme/utils/with-styles';

import { styles } from './loading.styles';

export interface LoadingProps extends WithStyles<typeof styles>, Omit<CircularProgressProps, 'classes'> {
  margin?: 'none' | 'small' | 'normal' | 'big';
  absolute?: boolean;
  height?: number | string;
}

const LoadingComponent: React.FC<LoadingProps> = ({ classes, margin = 'none', size = 40, absolute, height, className, ...otherProps }) => {
  return (
    <div 
      style={{ height }}
      className={cx(classes.root, className, classes[margin], { [classes.rootAbsolute]: absolute })}
    >
      <CircularProgress size={size} classes={{ svg: classes.svg }} {...otherProps} />
    </div>
  );
};

export const Loading = withStyles(styles)(LoadingComponent);
