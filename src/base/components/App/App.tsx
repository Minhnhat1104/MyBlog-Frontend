import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import DefaultLayout from '../../../layouts/DefaultLayout';
import publicRoutes from '~/routes';

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import ThemeCustomization from '~/base/themes';
import { RecoilRoot } from 'recoil';
import { Box, CssBaseline } from '@mui/material';
import AxiosContext from '~/contexts/AxiosContext';

// Create a client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60000,
    },
  },
});

function App() {
  return (
    <RecoilRoot>
      <ThemeCustomization>
        <CssBaseline />
        <QueryClientProvider client={queryClient}>
          <Router>
            <AxiosContext>
              <Routes>
                {publicRoutes.map((route, index) => {
                  let Layout = DefaultLayout;
                  if (route.layout) {
                    Layout = route.layout;
                  }
                  const Element = route.element;
                  return (
                    <Route
                      key={index}
                      path={route.path}
                      element={
                        <Layout>
                          <Element />
                        </Layout>
                      }
                    />
                  );
                })}
              </Routes>
            </AxiosContext>
          </Router>
          <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
      </ThemeCustomization>
    </RecoilRoot>
  );
}

export default App;
