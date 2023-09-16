import { useState, useRef, useEffect, useContext } from 'react';
import { QueryContext } from '../../contexts/query.context';
import Checkbox from '../checkbox/checkbox';
import NumberInput from '../number-input/number-input';

import './filter-option.component.css';

const FilterOption = props => {
  // Destructure props
  const { field, checkBox, values, changeHandler, initVisibility } = props;
  const { query } = useContext(QueryContext);

  const [optionsVisible, setOptionsVisible] = useState(initVisibility);
  const [currentSeason, setCurrentSeason] = useState(query.season);
  const [sortOption, setSortOption] = useState(query.sort);

  // Reference for the field values container element
  const fieldValuesRef = useRef(null);

  // Toggle options visibility
  const toggleVisible = () => {
    setOptionsVisible(!optionsVisible);
  };

  // Determine the maximum height for the field values container
  const determineMaxHeight = field => {
    let height;
    if (field === 'Seasons' || field === 'Sort By') {
      height = 132;
    } else if (field === 'Year') {
      height = 44;
    } else height = 636;

    return height;
  };

  useEffect(() => {
    // Set the height of the field values container using CSS variable
    if (fieldValuesRef.current) {
      fieldValuesRef.current.style.setProperty(
        '--field-values-height',
        `${determineMaxHeight(field)}px`
      );
    }
  }, []);

  return (
    <div className={`filter w-full overflow-hidden lg:mb-1 ${field}`}>
      {/* Filter header */}
      <header
        onClick={toggleVisible}
        className="filter-header cursor-pointer border-b flex justify-between items-center text-[var(--main-text)] border-[#424242] border-solid pb-3 my-4"
      >
        <div className="field-name font-semibold">{field}</div>
        {/* Toggle button */}
        <button
          className={`toggle mr-1 outline-none ${
            optionsVisible ? 'rotate-[-180deg]' : ''
          } transition-transform duration-300`}
        >
          <i className={`fa-solid fa-angle-down`}></i>
        </button>
      </header>
      {/* Field values */}
      <div
        ref={fieldValuesRef}
        className={`field-values flex flex-col gap-3 ${
          optionsVisible ? 'visible' : ''
        }`}
      >
        {/* Render checkboxes or number input */}
        {checkBox ? (
          values.map((value, index) => (
            <Checkbox
              changeHandler={changeHandler}
              setCurrentSeason={setCurrentSeason}
              setSortOption={setSortOption}
              currentSeason={currentSeason}
              sortOption={sortOption}
              key={index}
              value={value}
            />
          ))
        ) : (
          <NumberInput changeHandler={changeHandler} />
        )}
      </div>
    </div>
  );
};

export default FilterOption;
