import * as React from 'react';
import { hot } from 'react-hot-loader';
// import Typography from '@material-ui/core/Typography';
import { withStyles, WithStyles } from '@material-ui/core/styles';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { observer } from 'mobx-react';
// import debounce from 'lodash/debounce';

// import PrivateModule from '@modules/Private';
// import PublicModule from '@modules/Public';
// import container from '@core/di';
// import AuthStore from '@shared/stores/auth';
// import ErrorHandler from '@shared/components/ErrorHandler';
// import { CSS_VARIABLES, getScreenHeight } from '@shared/utils/layout';
// import { NotificationType, showNotification } from '@shared/components/Notification';
// import { browser } from '@shared/utils/browser';

import styles from './App.styles';

export interface AppProps extends WithStyles<typeof styles>, RouteComponentProps { }

@hot(module)
@observer
class App extends React.Component<AppProps> {
  render() {
    return null;
  }

  // @observable private appCrashed: boolean;
  // private authStore = container.get<AuthStore>(AuthStore.diToken);

  // componentDidMount() {
  //   this.setCSSAppHeightVariable();
  //   window.addEventListener('resize', debounce(this.setCSSAppHeightVariable, 10));

  //   if (browser?.name === 'ie') {
  //     showNotification(
  //       'For full experience we recommend you change your Internet Explorer browser for another.',
  //       NotificationType.warning
  //     );
  //   }
  // }
  
  // private setCSSAppHeightVariable = () => {
  //   const doc = document.documentElement;
  
  //   doc.style.setProperty(CSS_VARIABLES.appHeight, `${getScreenHeight()}px`);
  // };

  // componentDidCatch() {
  //   this.appCrashed = true;
  // }

  // render() {
  //   const { classes } = this.props;

  //   if (this.appCrashed) {
  //     return <ErrorHandler />;
  //   }

  //   const { loggedIn } = this.authStore;

  //   return (
  //     <Typography component="div" className={classes.root}>
  //       <Route
  //         path="/"
  //         component={loggedIn ? PrivateModule : PublicModule}
  //       />
  //     </Typography>
  //   );
  // }
}

export default withStyles(styles)(withRouter(App));