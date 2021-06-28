import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import './scss/reset.scss';
import App from './App';
import UserProvider from './providers/UserProvider';

ReactDOM.render(
  <React.StrictMode>
    <UserProvider>
      <App />
    </UserProvider>
  </React.StrictMode>,
  document.getElementById('root'),
);
