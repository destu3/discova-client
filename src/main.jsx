import React from 'react';
import ReactDOM from 'react-dom/client';
import { UserProvider } from '../src/contexts/user.context';
import { AlertProvider } from '../src/contexts/alert.context';
import App from './App.jsx';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <UserProvider>
      <AlertProvider>
        <App />
      </AlertProvider>
    </UserProvider>
  </React.StrictMode>
);
