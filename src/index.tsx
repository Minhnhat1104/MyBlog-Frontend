import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './base/components/App/App';
import reportWebVitals from './reportWebVitals';
import GlobalStyle from './components/GlobalStyle';
import { ToastContainer } from 'react-toastify';
import { RecoilRoot } from 'recoil';

const root = ReactDOM.createRoot(document.getElementById('root')!);
root.render(
  <React.StrictMode>
    <RecoilRoot>
      <GlobalStyle>
        <App />
        <ToastContainer />
      </GlobalStyle>
    </RecoilRoot>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
