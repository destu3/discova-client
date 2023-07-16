import { useState, useRef, useEffect } from 'react';
import Checkbox from '../checkbox/checkbox';
import NumberInput from '../number-input/number-input';

import './filter-option.component.css';

const FilterOption = props => {
  // Destructure props
  const { field, checkBox, values, changeHandler, initVisibility } = props;

  // State for options visibility and current season (for Checkbox component)
  const [optionsVisible, setOptionsVisible] = useState(initVisibility);
  const [currentSeason, setCurrentSeason] = useState(null);

  // Reference for the field values container element
  const fieldValuesRef = useRef(null);

  // Toggle options visibility
  const toggleVisible = () => {
    setOptionsVisible(!optionsVisible);
  };

  // Determine the maximum height for the field values container
  const determineMaxHeight = field => {
    let height;
    if (field === 'Seasons') height = 132;
    else if (field === 'Year') height = 44;
    else height = 636;

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
    <div className={`filter w-full overflow-hidden ${field}`}>
      {/* Filter header */}
      <header className="filter-header border-b flex justify-between items-center text-[var(--main-text)] border-[#424242] border-solid pb-3 my-4">
        <h3 className="field-name font-semibold">{field}</h3>
        {/* Toggle button */}
        <button
          onClick={toggleVisible}
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
              currentSeason={currentSeason}
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
