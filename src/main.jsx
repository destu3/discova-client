import React from 'react';
import ReactDOM from 'react-dom/client';
import { UserProvider } from '../src/contexts/user.context';
import { OverlayProvider } from '../src/contexts/overlay.context';
import App from './App.jsx';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <UserProvider>
      <OverlayProvider>
        <App />
      </OverlayProvider>
    </UserProvider>
  </React.StrictMode>
);
