import { useState, useContext, useEffect } from 'react';
import { Input } from 'antd';
import { search } from '../../services/api/anime';
import FilterOption from '../../components/filter-option/filter-option';
import ResultContainer from '../../components/result-container/result-container';
import { QueryContext } from '../../contexts/query.context';
import { AlertContext } from '../../contexts/alert.context';
import { showAlert } from '../../utils//alert-utils';
import genres from '../../data/genres.json';
import './category-search.component.css';
import '../../components/skeleton-loaders/skeleton.component.css';

const { Search } = Input;

// Component that handles searching and displaying various categories of content
const CategorySearch = ({ name }) => {
  const [data, setData] = useState([]);
  const [noMoreData, setNoMoreData] = useState(false);
  const [loading, setLoading] = useState(true);
  const [moreLoading, setMoreLoading] = useState(false);
  const [debounceId, setDebounceId] = useState(null);
  const { query, setQuery } = useContext(QueryContext);
  const { setAlert } = useContext(AlertContext);

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
        showAlert(err.message, setAlert, true);
        setData([]);
        setLoading(false);
      }
    }, 350);

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
    if (noMoreData === false) {
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
        showAlert(err.message, setAlert, true);
        setNoMoreData(true);
        setMoreLoading(false);
      }
    }
  };

  useEffect(() => {
    defaultSearch().then(() => {
      setTimeout(() => {
        window.scrollTo(0, 0);
      });
    });
  }, []);

  return (
    <div className="relative p-2" aria-label={`content-type-${name}`}>
      <header className="flex flex-col justify-center items-center">
        {/* Render the search input */}
        <Search
          defaultValue={query.search}
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
            values={['Popularity', 'Trending', 'Average Score', 'Favourites']}
            field="Sort By"
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
            values={['Popularity', 'Trending', 'Average Score', 'Favourites']}
            field="Sort By"
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
          {data.length >= 20 && (
            <button
              onClick={handleLoadMore}
              className={`load-more-btn px-5 py-3 mt-10 transition-all duration-200 shadow-[rgba(0,0,0,0.16)_0px_3px_6px,rgba(0,0,0,0.23)_0px_3px_6px]
             rounded bg-[#1e1e1ee6] hover:bg-[#252525e6] text-[var(--main-text)] font-medium text-[0.95rem]`}
            >
              Show More Results
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default CategorySearch;
