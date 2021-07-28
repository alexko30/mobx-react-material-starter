import './polyfill';
import 'normalize.css';
import 'reflect-metadata';
import 'react-hot-loader';

import React from 'react';
import { render } from 'react-dom';
import { Router } from 'react-router-dom';

import App from './App';
import { history } from '@shared/utils/history';
import { ThemeProvider } from '@core/theme/provider';
import { CssBaseline } from '@core/theme/utils/css-baseline';
import { createTheme } from '@core/theme';

const theme = createTheme();

async function initializeApp() {
  try {
    render(
      (
        <Router history={history}>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <App />
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