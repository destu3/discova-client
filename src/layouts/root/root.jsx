import { useContext } from 'react';
import { Outlet } from 'react-router-dom';
import { OverlayContext } from '../../contexts/overlay.context';
import Navbar from '../../components/navbar/navbar';

// The Root component defines the layout for all pages
const Root = () => {
  const { overlay } = useContext(OverlayContext);

  return (
    <>
      {/* Render the Navbar */}
      <Navbar />

      {/* Render the Outlet to display nested routes */}
      <Outlet />
    </>
  );
};

export default Root;
