import React from 'react'
import { ThemeProvider } from 'styled-components'
import { Provider } from 'react-redux'
import theme from './theme';
import './normalise.scss'
import Routes from './Routes'
import { Router } from 'react-router-dom';
import { QueryCache, ReactQueryCacheProvider } from 'react-query'
import history from 'src/util/history'
import Header from '../components/header'
import styled from 'styled-components'
import { persistStore } from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react';
import store from 'src/slices/store'
import Footer from 'src/components/footer'
import ScrollToTop from 'src/components/util/ScrollToTop'
import ToastWrapper from 'src/components/toast/ToastWrapper'

const Container = styled.div`
  width: 100vw;
  max-width: 100vw;
  overflow-x: hidden;
  min-height: 101vh;
  display: flex;
  flex-direction: column;

  @media (min-width: ${props => props.theme.medium}) {
    width: initial;
    max-width: initial;
    overflow-x: initial;
  }
`;

const FillHeight = styled.div`
  flex: 2;
  display: flex;
  flex-direction: column;

  & > div {
    flex: 2;
  }
`;

const persistor = persistStore(store);

export const queryCache = new QueryCache({
  // defaultConfig: {
  //   queries: {
  //     refetchOnWindowFocus: false,
  //   },
  // },
})

const App = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ThemeProvider theme={theme}>
          <Router history={history}>
            <ReactQueryCacheProvider queryCache={queryCache}>
              <Container>
                <Header />
                <FillHeight>
                  <Routes />
                </FillHeight>
                <Footer />
              </Container>
              <ToastWrapper />
              <ScrollToTop />
            </ReactQueryCacheProvider>
          </Router>
        </ThemeProvider>
      </PersistGate>
    </Provider>
  );
}

export default App;
