import { createContext, useState } from 'react';

// Create the QueryContext
export const QueryContext = createContext({
  query: {},
  setQuery: () => null,
});

// Define the QueryProvider component
export const QueryProvider = ({ children }) => {
  // Initialize the query state
  const [query, setQuery] = useState({
    search: '',
    page: 1,
    genres: new Set(),
    year: null,
    season: undefined,
  });

  // Create the value object for the context
  const value = { query, setQuery };

  // Render the context provider with the provided children
  return (
    <QueryContext.Provider value={value}>{children}</QueryContext.Provider>
  );
};
