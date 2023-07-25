import { useContext } from 'react';
import { Outlet } from 'react-router-dom';
import { Alert } from 'antd';
import { AlertContext } from '../../contexts/alert.context';
import Navbar from '../../components/navbar/navbar';

// The Root component defines the layout for all pages
const Root = () => {
  const { alert } = useContext(AlertContext);
  const { message, type, visible } = alert;

  return (
    <>
      {/* Render the Navbar */}
      <Navbar />
      {
        <Alert
          showIcon
          message={message}
          type={type}
          className={`fixed border-2 opacity-0 pointer-events-none transition-all duration-300 min-w-[75%] max-w-[75%] sm:min-w-[0] sm:max-w-[600px] z-50 left-2/4 top-24 font-medium translate-x-[-50%] outline-none ${
            visible && 'opacity-100 pointer-events-auto'
          }`}
        />
      }

      {/* Render the Outlet to display nested routes */}
      <Outlet />
    </>
  );
};

export default Root;
