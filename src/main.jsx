import React from 'react';
import ReactDOM from 'react-dom/client';
import { ConfigProvider, theme } from 'antd';
import { UserProvider } from '../src/contexts/user.context';
import { AlertProvider } from '../src/contexts/alert.context';
import { MusicVideoProvider } from './contexts/music-video.context';
import { QueryProvider } from './contexts/query.context';
import App from './App.jsx';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <UserProvider>
      <AlertProvider>
        <ConfigProvider
          theme={{
            algorithm: theme.darkAlgorithm,
            token: {
              colorPrimary: '#d8d8d8',
              controlHeight: 38,
              fontSize: 16,
            },
          }}
        >
          <MusicVideoProvider>
            <QueryProvider>
              <App />
            </QueryProvider>
          </MusicVideoProvider>
        </ConfigProvider>
      </AlertProvider>
    </UserProvider>
  </React.StrictMode>
);
