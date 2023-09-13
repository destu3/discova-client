import { useEffect, useState, useContext } from 'react';
import { nanoid } from 'nanoid';
import { QueryContext } from '../../contexts/query.context';
import './checkbox.component.css';

const seasons = ['Spring', 'Summer', 'Fall', 'Winter'];
const sortOptions = ['Popularity', 'Trending', 'Average Score', 'Favourites'];

const Checkbox = props => {
  // Destructure props
  const {
    value,
    setCurrentSeason,
    currentSeason,
    sortOption,
    setSortOption,
    changeHandler,
  } = props;

  // State and context variables
  const [randomId, setRandomId] = useState(null);
  const { query } = useContext(QueryContext);

  const isSeason = seasons.includes(value);
  const isSortOption = sortOptions.includes(value);

  // Function to toggle genres in the query
  const toggleGenre = (genresSet, genre) => {
    if (genresSet.has(genre)) {
      genresSet.delete(genre);
    } else {
      genresSet.add(genre);
    }
  };

  // Function to set the selected season in the query
  const setSeason = (newQuery, value) => {
    if (newQuery.season === value) {
      newQuery.season = null;
    } else {
      newQuery.season = value;
    }
  };

  // function to set the sort option in the query
  const setOption = (newQuery, value) => {
    if (newQuery.sort === value) {
      newQuery.sort = null;
    } else {
      newQuery.sort = value;
    }
  };

  // Handle checkbox click event
  const handleClick = e => {
    const { value } = e.target.dataset;

    const newQuery = { ...query, page: 1 };

    if (isSeason) {
      setSeason(newQuery, value);
      const newSeason = currentSeason !== value ? value : undefined;
      setCurrentSeason(newSeason);
    } else if (isSortOption) {
      setOption(newQuery, value);
      const newOption = sortOption !== value ? value : undefined;
      setSortOption(newOption);
    } else {
      toggleGenre(newQuery.genres, value);
    }

    changeHandler(null, newQuery);
  };

  // Generate random ID for input element
  useEffect(() => {
    setRandomId(nanoid(15));
  }, []);

  return (
    <div className="checkbox-wrapper">
      {/* Checkbox input */}
      {isSeason || isSortOption ? (
        <input
          data-value={value}
          type="checkbox"
          onClick={handleClick}
          id={randomId}
          className="checkbox"
          checked={currentSeason === value || sortOption === value}
          readOnly
        />
      ) : (
        <input
          data-value={value}
          type="checkbox"
          onClick={handleClick}
          id={randomId}
          className="checkbox"
        />
      )}

      {/* Label for the checkbox */}
      <label htmlFor={randomId} className="field-value block font-medium">
        {value}
      </label>
    </div>
  );
};

export default Checkbox;
