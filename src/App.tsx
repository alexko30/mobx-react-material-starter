import * as React from 'react';
import { hot } from 'react-hot-loader';
import Typography from '@material-ui/core/Typography';
import { withRouter, RouteComponentProps, Route } from 'react-router-dom';
import debounce from 'lodash/debounce';

import { withStyles, WithStyles } from '@core/theme/utils/with-styles';
import { ErrorHandler } from '@shared/components/error-handler';
import { CSS_VARIABLES, getScreenHeight } from '@shared/utils/layout';
import { browser } from '@shared/utils/browser';

import styles from './App.styles';

export interface AppProps extends WithStyles<typeof styles>, RouteComponentProps { }

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
        <Route
          path="/"
          render={() => <div style={{ display: 'flex', alignSelf: 'center', justifyContent: 'center' }}>Hello world!</div>}
        />
      </Typography>
    );
  }
}

export default withStyles(styles)(withRouter(App));