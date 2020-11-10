import React from 'react'
import { ThemeProvider } from 'styled-components'
import { Provider } from 'react-redux'
import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit'
import logger from 'redux-logger'

import theme from './theme';
import rootReducer from 'src/slices';

import './normalise.scss'
import Routes from './Routes'

import Header from './Header';
import { Router } from 'react-router-dom';
import ToastWrapper from './ToastWrapper'
import { queryCache, ReactQueryCacheProvider } from 'react-query'
import history from 'src/util/history'

const loggerMiddleware = process.env.NODE_ENV === 'development' ? [logger] : [];

export const store = configureStore({
  reducer: rootReducer,
  middleware: [...getDefaultMiddleware({ thunk: false }), ...loggerMiddleware],
  devTools: process.env.NODE_ENV !== 'production',
})

const App = () => {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <Router history={history}>
          <ReactQueryCacheProvider queryCache={queryCache}>
            <Header />
            <Routes />
            <ToastWrapper />
          </ReactQueryCacheProvider>
        </Router>
      </ThemeProvider>
    </Provider>
  );
}

export default App;
