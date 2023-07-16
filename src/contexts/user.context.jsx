import { useState, createContext } from 'react';

// Create the UserContext
export const UserContext = createContext({
  currentUser: null,
  setCurrentUser: () => null,
});

// Define the UserProvider component
export const UserProvider = ({ children }) => {
  // Get the user from localStorage
  const user = JSON.parse(localStorage.getItem('currentUser'));

  // Initialize the currentUser state
  const [currentUser, setCurrentUser] = useState(user);

  // Create the value object for the context
  const value = { currentUser, setCurrentUser };

  // Render the context provider with the provided children
  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export default UserProvider;
