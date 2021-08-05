import './polyfill';
import 'normalize.css';
import '@core/di/dependencies';
import 'react-hot-loader';

import { render } from 'react-dom';
import { Router } from 'react-router-dom';

import { history } from '@shared/utils/history';
import { ThemeProvider } from '@core/theme/provider';
import { CssBaseline } from '@core/theme/utils/css-baseline';
import { createTheme } from '@core/theme';
import { inject } from '@core/di/utils';
import { DI_TOKENS } from '@shared/constants/di';
import { LazyLoad } from '@shared/components/lazy-load';
import { IHttpClient } from '@shared/types/http-client';
import { IConfig } from '@shared/types/config';
import { IAuthService } from '@shared/types/auth';
import { initializeStateManagement } from '@core/state-management/setup';

const App = React.lazy(() => import('./app'));

const config = inject<IConfig>(DI_TOKENS.config);
const httpClient = inject<IHttpClient>(DI_TOKENS.appHttpClient);
const authService = inject<IAuthService>(DI_TOKENS.authService);

const theme = createTheme();

async function initializeApp() {
  try {
    initializeStateManagement();
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