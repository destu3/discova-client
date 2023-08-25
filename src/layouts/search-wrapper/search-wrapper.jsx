import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { QueryProvider } from '../../contexts/query.context';

// The SearchWrapper component defines the layout for search pages
const SearchWrapper = () => {
  useEffect(() => {
    document.title = 'Search Anime - Discova';
  }, []);

  return (
    <QueryProvider>
      <div className="divider border-[var(--underline-grey)] border-t-2 border-solid"></div>
      <main className="search-wrapper mt-5 sm:mt-10 w-full sm:w-11/12 mx-auto">
        {/* Render the nested routes */}
        <Outlet />
      </main>
    </QueryProvider>
  );
};

export default SearchWrapper;
