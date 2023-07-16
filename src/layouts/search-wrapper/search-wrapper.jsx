import { ConfigProvider, theme } from 'antd';
import { Outlet } from 'react-router-dom';
import { QueryProvider } from '../../contexts/query.context';

// The SearchWrapper component defines the layout for search pages
const SearchWrapper = () => {
  return (
    <ConfigProvider
      theme={{
        algorithm: theme.darkAlgorithm,
        token: {
          colorPrimary: '#d8d8d8',
          controlHeight: 38,
          fontSize: 15,
        },
      }}
    >
      {/* Wrap the Outlet with the QueryProvider */}
      <QueryProvider>
        <main className="search-wrapper mt-5 sm:mt-10 w-full sm:w-11/12 mx-auto">
          {/* Render the nested routes */}
          <Outlet />
        </main>
      </QueryProvider>
    </ConfigProvider>
  );
};

export default SearchWrapper;
