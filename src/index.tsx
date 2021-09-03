import './polyfill';
import 'reset-css';
import '@core/di/dependencies';
import 'react-hot-loader';

import { render } from 'react-dom';

import { appHistory } from '@shared/utils/history';
import { AppThemeProvider } from '@core/theme/provider';
import { AppCssBaseline } from '@core/theme/utils/css-baseline';
import { appCreateTheme } from '@core/theme';
import { appInject } from '@core/di/utils';
import { DI_TOKENS } from '@shared/constants/di';
import { LazyLoad } from '@shared/components/lazy-load';
import { IHttpClientService } from '@shared/types/http-client';
import { IConfigService } from '@shared/types/config-service';
import { IAuthService } from '@shared/types/auth-service';
import { initializeStateManagement } from '@core/state-management/setup';
import { AppRouter } from '@shared/components/router';

const App = React.lazy(() => import('./app'));

const config = appInject<IConfigService>(DI_TOKENS.configService);
const httpClient = appInject<IHttpClientService>(DI_TOKENS.appHttpClientService);
const authService = appInject<IAuthService>(DI_TOKENS.authService);

const theme = appCreateTheme();

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
        <AppRouter history={appHistory}>
          <AppThemeProvider theme={theme}>
            <AppCssBaseline />
            <LazyLoad>
              <App />
            </LazyLoad>
          </AppThemeProvider>
        </AppRouter>
      ),
      document.getElementById('root')
    );
  } catch (err) {
    alert('Sorry, we are running a problem while loading the App');

    throw err;
  }
}

initializeApp();