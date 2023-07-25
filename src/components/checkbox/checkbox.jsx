import { useEffect, useState, useContext } from 'react';
import { nanoid } from 'nanoid';
import { QueryContext } from '../../contexts/query.context';
import './checkbox.component.css';

const seasons = ['Spring', 'Summer', 'Fall', 'Winter'];

const Checkbox = props => {
  // Destructure props
  const { value, setCurrentSeason, currentSeason, changeHandler } = props;

  // State and context variables
  const [randomId, setRandomId] = useState(null);
  const { query } = useContext(QueryContext);

  // Check if the checkbox represents a season
  const isSeason = seasons.includes(value);

  // Function to toggle genres in the query
  const toggleGenre = (genresSet, genre) => {
    if (genresSet.has(genre)) {
      genresSet.delete(genre);
    } else {
      genresSet.add(genre);
    }
  };

  // Function to toggle the selected season in the query
  const toggleSeason = (newQuery, value) => {
    if (newQuery.season === value) {
      newQuery.season = null;
    } else {
      newQuery.season = value;
    }
  };

  // Handle checkbox click event
  const handleClick = e => {
    const { value } = e.target.dataset;

    const newQuery = { ...query, page: 1 };

    if (isSeason) {
      toggleSeason(newQuery, value);
      const newSeason = currentSeason !== value ? value : undefined;
      setCurrentSeason(newSeason);
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
      {isSeason ? (
        <input
          data-value={value}
          type="checkbox"
          onClick={handleClick}
          id={randomId}
          className="checkbox"
          checked={currentSeason === value}
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
