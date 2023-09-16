import { useContext } from 'react';
import { QueryContext } from '../../contexts/query.context';
import './number-input.component.css';

const NumberInput = ({ changeHandler }) => {
  // Get the query object from the QueryContext
  const { query } = useContext(QueryContext);

  // Handle input change event
  const handleChange = e => {
    const { value } = e.target;
    const newQuery = { ...query, page: 1, year: parseInt(value) };

    // Validate data before setting the query object
    changeHandler(null, newQuery);
  };

  return (
    <input
      onChange={handleChange}
      type="number"
      defaultValue={!query.year ? '' : String(query.year)}
      min={1940}
      max={2024}
    />
  );
};

export default NumberInput;
