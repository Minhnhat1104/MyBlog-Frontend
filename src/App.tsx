import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import DefaultLayout from './layouts/DefaultLayout';
import publicRoutes from '~/routes';

import './App.css';
import { Toaster } from 'react-hot-toast';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { QueryClient, QueryClientProvider } from 'react-query';

// Create a client
const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <div className="App">
          <Toaster position="top-right" reverseOrder={false} />
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
        </div>
      </Router>
    </QueryClientProvider>
  );
}

export default App;
