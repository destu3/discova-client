import { useState, useContext, useEffect } from 'react';
import { Input } from 'antd';
import { search } from '../../services/internal-api/anime';
import FilterOption from '../../components/filter-option/filter-option';
import ResultContainer from '../../components/result-container/result-container';
import { QueryContext } from '../../contexts/query.context';
import { AlertContext } from '../../contexts/alert.context';
import { manageAlert } from '../../helpers//alert-utils';
import genres from '../../data/genres.json';
import './category-search.component.css';

const { Search } = Input;

// Component that handles searching and displaying various categories of content
const CategorySearch = ({ name }) => {
  const [data, setData] = useState([]);
  const [noMoreData, setNoMoreData] = useState(false);
  const [loading, setLoading] = useState(true);
  const [moreLoading, setMoreLoading] = useState(false);
  const [debounceId, setDebounceId] = useState(null);
  const { query, setQuery } = useContext(QueryContext);
  const { alert, setAlert } = useContext(AlertContext);

  // Handle input change event
  const handleChange = async (e, _newQuery) => {
    setNoMoreData(false);
    const value = e ? e.target.value : query.search;

    clearTimeout(debounceId);

    const timeoutId = setTimeout(async () => {
      const newQuery = _newQuery
        ? _newQuery
        : { ...query, page: 1, search: value };
      setQuery(newQuery);
      setLoading(true);
      try {
        const results = await search(newQuery);
        setData(results.mediaArray);
        setLoading(false);
      } catch (err) {
        manageAlert(err, alert, setAlert);
        setData([]);
        setLoading(false);
      }
    }, 700);

    setDebounceId(timeoutId);
  };

  // Perform default search
  const defaultSearch = async () => {
    const newQuery = { ...query, page: 1 };
    setQuery(newQuery);

    setLoading(true);
    const results = await search(newQuery);
    setData(results.mediaArray);
    setLoading(false);
  };

  // Handle duplicates in data
  const handleDuplicates = (data, newData) => {
    const uniqueData = newData.filter(anime => {
      const isDuplicate = data.some(existingAnime => {
        return existingAnime.id === anime.id;
      });

      return !isDuplicate;
    });

    return uniqueData;
  };

  // Handle load more action
  const handleLoadMore = async () => {
    if (noMoreData === false)
      if (
        document.documentElement.scrollTop +
          document.documentElement.clientHeight ===
        document.documentElement.scrollHeight
      ) {
        const newQuery = { ...query, page: ++query.page };

        setQuery(newQuery);
        setMoreLoading(true);
        try {
          const results = await search(newQuery);
          const mediaArray = handleDuplicates(data, results.mediaArray);
          const appended = [...data, ...mediaArray];
          setData(appended);
          setMoreLoading(false);
        } catch (err) {
          manageAlert(err, alert, setAlert);
          setNoMoreData(true);
          setMoreLoading(false);
        }
      }
  };

  useEffect(() => {
    defaultSearch();
  }, []);

  // Render results with search=""
  useEffect(() => {
    document.addEventListener('scroll', handleLoadMore);

    return () => {
      document.removeEventListener('scroll', handleLoadMore);
    };
  }, [data, noMoreData]);

  return (
    <div className="relative p-2" aria-label={`content-type-${name}`}>
      <header className="flex flex-col justify-center items-center">
        {/* Render the search input */}
        <Search
          className="max-w-[600px]"
          placeholder={`Search for ${name}`}
          allowClear
          onChange={handleChange}
        />

        {/* Render the filter options for small screens */}
        <div className="sm-filter-section lg:!hidden w-full max-w-[600px] mt-2 p-1">
          <FilterOption
            changeHandler={handleChange}
            initVisibility={false}
            field="Year"
          />
          <FilterOption
            changeHandler={handleChange}
            initVisibility={false}
            checkBox={true}
            values={['Spring', 'Summer', 'Fall', 'Winter']}
            field="Seasons"
          />
          <FilterOption
            changeHandler={handleChange}
            initVisibility={false}
            checkBox={true}
            values={genres}
            field="Genres"
          />
        </div>
      </header>
      <div className="main-content mt-5 lg:mt-10 flex gap-3">
        {/* Render the filter options for large screens */}
        <section className="filter-section hidden lg:block min-w-[200px] max-w-[250px] pt-0 p-2">
          <FilterOption
            changeHandler={handleChange}
            initVisibility={true}
            field="Year"
          />
          <FilterOption
            changeHandler={handleChange}
            initVisibility={true}
            checkBox={true}
            values={['Spring', 'Summer', 'Fall', 'Winter']}
            field="Seasons"
          />
          <FilterOption
            changeHandler={handleChange}
            initVisibility={true}
            checkBox={true}
            values={genres}
            field="Genres"
          />
        </section>
        <div className="flex-1 flex items-center flex-col j pb-4 h-full">
          {/* Render the result container */}
          <ResultContainer
            loading={loading}
            moreLoading={moreLoading}
            data={data}
          />
        </div>
      </div>
    </div>
  );
};

export default CategorySearch;
