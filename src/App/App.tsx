import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import publicRoutes from '~/routes';

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import ThemeCustomization from '~/themes';
import { RecoilRoot } from 'recoil';
import { CssBaseline, Stack } from '@mui/material';
import './App.css';
import ToastContext from '~/contexts/ToastContext';

// Create a client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60000,
    },
  },
});

function App() {
  const router = createBrowserRouter(publicRoutes);

  return (
    <Stack sx={{ width: 1, height: '100vh' }}>
      <RecoilRoot>
        <ThemeCustomization>
          <CssBaseline />
          <ToastContext>
            <QueryClientProvider client={queryClient}>
              <RouterProvider router={router} />
              <ReactQueryDevtools initialIsOpen={false} />
            </QueryClientProvider>
          </ToastContext>
        </ThemeCustomization>
      </RecoilRoot>
    </Stack>
  );
}

export default App;
