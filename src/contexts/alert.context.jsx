import { createContext, useState } from 'react';

// create AlertContext
export const AlertContext = createContext();

export const AlertProvider = ({ children }) => {
  const [alert, setAlert] = useState({
    type: 'error',
    message: 'This is an example of an error message',
    visible: false,
  });
  const value = { alert, setAlert };
  return (
    <AlertContext.Provider value={value}>{children}</AlertContext.Provider>
  );
};
