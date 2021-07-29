import './polyfill';
import 'normalize.css';
import 'reflect-metadata';
import 'react-hot-loader';

import React from 'react';
import { render } from 'react-dom';
import { Router } from 'react-router-dom';

import { Config } from '@core/config';
import { HttpClient } from '@core/http-client';
import { AuthService } from '@shared/services/auth';
import { history } from '@shared/utils/history';
import { ThemeProvider } from '@core/theme/provider';
import { CssBaseline } from '@core/theme/utils/css-baseline';
import { createTheme } from '@core/theme';
import { inject } from '@core/di/utils';
import { DI_TOKENS } from '@shared/constants/di';
import { LazyLoad } from '@shared/components/lazy-load';

const App = React.lazy(() => import('./app'));

const config = inject<Config>(DI_TOKENS.config);
const httpClient = inject<HttpClient>(DI_TOKENS.appHttpClient);
const authService = inject<AuthService>(DI_TOKENS.authService);

const theme = createTheme();

async function initializeApp() {
  try {
    await config.initialize();
    httpClient.setConfig({
      defaults: {
        baseURL: config.baseUrl
      },
      refreshToken: authService.refreshToken,
      getUserLoginStatus: () => authService.loggedIn,
      getAccessToken: () => authService.tokens.access,
      getTokenRefreshStatus: () => authService.tokenRefreshStatus,
    });

    render(
      (
        <Router history={history}>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <LazyLoad>
              <App />
            </LazyLoad>
          </ThemeProvider>
        </Router>
      ),
      document.getElementById('root')
    );
  } catch (err) {
    alert('Sorry, we are running a problem while loading the App');

    throw err;
  }
}

initializeApp();