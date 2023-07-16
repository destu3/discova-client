import { createContext, useState } from 'react';

// Create the OverlayContext
export const OverlayContext = createContext({
  overlay: {
    overlayType: '',
    overlayContent: '',
    active: false,
  },
  setOverlay: () => {},
});

// Define the OverlayProvider component
export const OverlayProvider = ({ children }) => {
  // Initialize the overlay state
  const [overlay, setOverlay] = useState({
    overlayType: '',
    overlayContent: '',
    active: false,
  });

  // Create the value object for the context
  const value = { overlay, setOverlay };

  // Render the context provider with the provided children
  return (
    <OverlayContext.Provider value={value}>{children}</OverlayContext.Provider>
  );
};

export default OverlayProvider;
