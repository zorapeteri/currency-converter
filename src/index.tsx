import React from 'react';
import ReactDOM from 'react-dom';
import './scss/reset.scss';
import './scss/global.scss';
import App from './App';
import UserProvider from './providers/UserProvider';
import CurrencyProvider from './providers/CurrencyProvider';

ReactDOM.render(
  <React.StrictMode>
    <UserProvider>
      <CurrencyProvider>
        <App />
      </CurrencyProvider>
    </UserProvider>
  </React.StrictMode>,
  document.getElementById('root'),
);
