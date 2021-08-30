import { Loading } from '@shared/components/loading';
import { appWithStyles, AppWithStyles } from '@core/theme/utils/with-styles';

import { styles } from './lazy-load.styles';

export interface LazyLoadProps extends AppWithStyles<typeof styles> {
  withFallback?: boolean;
  component?: React.ComponentType<any>;
}

const LazyLoadComponent: React.FC<LazyLoadProps> = (props) => {
  const { component: Component, classes, children, withFallback, ...otherProps } = props;
  
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
};

LazyLoadComponent.defaultProps = {
  withFallback: true,
};

export const LazyLoad = appWithStyles(styles)(LazyLoadComponent);
