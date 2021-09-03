import { hot } from 'react-hot-loader';
import debounce from 'lodash/debounce';

import { Typography } from '@shared/components/typography';
import { ErrorHandler } from '@shared/components/error-handler';
import { appWithStyles, AppWithStyles } from '@core/theme/utils/with-styles';
import { CSS_VARIABLES, getScreenHeight } from '@shared/utils/layout';
import { browser } from '@shared/utils/browser';
import { ROUTES } from '@shared/constants/routes';
import { UserRole } from '@shared/models/user/role';
import { LazyLoad } from '@shared/components/lazy-load';
import { AppRoute, AppRouteComponentProps, AppRouteProps } from '@shared/components/route';
import { AppRouterSwitch } from '@shared/components/router-switch';
import { appWithRouter } from '@shared/hocs/with-router';

const Users = React.lazy(() => import('./ui/users'));

import { styles } from './app.styles';

export interface AppProps extends AppWithStyles<typeof styles>, AppRouteComponentProps { }

@hot(module)
class App extends React.Component<AppProps> {
  readonly state = {
    appCrashed: false,
  };

  componentDidMount() {
    this.setCSSAppHeightVariable();
    window.addEventListener('resize', debounce(this.setCSSAppHeightVariable, 10));

    if (browser?.name === 'ie') {
      // showNotification(
      //   'For full experience we recommend you change your Internet Explorer browser for another.',
      //   NotificationType.warning
      // );
    }
  }
  
  private setCSSAppHeightVariable = () => {
    const doc = document.documentElement;
  
    doc.style.setProperty(CSS_VARIABLES.appHeight, `${getScreenHeight()}px`);
  };

  private get routes(): Array<{ routeProps: AppRouteProps; key: string; roles?: Array<UserRole> }> {
    return [
      { routeProps: { component: Users, path: ROUTES.private.users.root }, key: ROUTES.private.users.root } 
    ];
  }

  componentDidCatch() {
    this.setState((state) => ({ ...state, appCrashed: true }));
  }

  render() {
    const { classes } = this.props;
    const { appCrashed } = this.state;

    if (appCrashed) {
      return <ErrorHandler />;
    }

    return (
      <Typography component="div" className={classes.root}>
        <LazyLoad>
          <AppRouterSwitch>
            {this.routes.map(({ key, routeProps }) => (
              <AppRoute key={key} {...routeProps} />
            ))}
          </AppRouterSwitch>
          <div></div>
        </LazyLoad>












      </Typography>
    );
  }
}

export default appWithStyles(styles)(appWithRouter(App));