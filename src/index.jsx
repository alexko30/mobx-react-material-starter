import './polyfill';
import 'reflect-metadata';
import 'react-hot-loader';

import React from 'react';
import { render } from 'react-dom';
// import { Router } from 'react-router-dom';
// import CssBaseline from '@material-ui/core/CssBaseline';
// import { ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles';

// import theme from '@core/theme';
// import container from '@core/di';
// import Config from '@core/config';
// import App from './App';
// import Notification from '@shared/components/Notification';
// import Confirmation from '@shared/components/Confirmation';
// import HTTPClient from '@core/http-client';
// import AuthStore from '@shared/stores/auth';
// import history from '@shared/utils/history';

// const config = container.get<Config>(Config.diToken);
// const httpClient = container.get<HTTPClient>(HTTPClient.diToken);
// const authStore = container.get<AuthStore>(AuthStore.diToken);

async function initializeApp() {
  try {
    // await config.initialize();
    // httpClient.initialize({
    //   refreshToken: authStore.refreshToken,
    //   getUserLoginStatus: () => authStore.loggedIn,
    //   getAccessToken: () => authStore.tokens.access,
    //   getTokenRefreshStatus: () => authStore.tokenRefreshStatus,
    // });
    // await config.updateConfig();
    // await authStore.initialize();

    render(
      (
        // <Router history={history}>
        //   <MuiThemeProvider theme={theme}>
        //     <CssBaseline />
        //     <Notification />
        //     <Confirmation />
        //     <App />
        //   </MuiThemeProvider>
        // </Router>
        <h1>hello world</h1>
      ),
      document.getElementById('root')
    );
  } catch {
    alert('Sorry, we are running a problem while loading the App');
  }
}

// if (IS_PRODUCTION) {
//   serviceWorkerRegistration.register();
// }

initializeApp();
