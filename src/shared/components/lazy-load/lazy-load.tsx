import React from 'react';

import { Loading } from '@shared/components/loading';
import { withStyles, WithStyles } from '@core/theme/utils/with-styles';

import { styles } from './lazy-load.styles';

export interface LazyLoadProps extends WithStyles<typeof styles> {
  withFallback?: boolean;
  component?: React.ComponentType<any>;
}

class LazyLoadComponent extends React.Component<LazyLoadProps> {
  static defaultProps = {
    withFallback: true,
  };

  render() {
    const { component: Component, classes, children, withFallback, ...otherProps } = this.props;

    return (
      <React.Suspense 
        fallback={withFallback
          ? <Loading classes={{ root: classes.root }} size={40} />
          : null
        }
      >
        {Component 
          ? <Component {...otherProps} />
          : children
        }
      </React.Suspense>
    );
  }
}

export const LazyLoad = withStyles(styles)(LazyLoadComponent);
