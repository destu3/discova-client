import { useContext } from 'react';
import { Outlet } from 'react-router-dom';
import { Alert } from 'antd';
import { AlertContext } from '../../contexts/alert.context';
import Navbar from '../../components/navbar/navbar';
import MusicVideoOverlay from '../../components/music-video-overlay/music-video-overlay';

// The Root component which all components reside in
const Root = () => {
  const { alert } = useContext(AlertContext);
  const { message, type, visible } = alert;

  return (
    <>
      {/* Render the Navbar */}
      <Navbar />

      <Alert
        showIcon
        message={message}
        type={type}
        className={`whitespace-nowrap fixed border-2 opacity-0 pointer-events-none transition-all duration-300 sm:min-w-[0] sm:max-w-[600px] z-50 left-2/4 top-24 font-medium translate-x-[-50%] outline-none ${
          visible && 'opacity-100 pointer-events-auto'
        }`}
      />

      <MusicVideoOverlay />

      {/* Render the Outlet to display nested routes */}
      <Outlet />
    </>
  );
};

export default Root;
