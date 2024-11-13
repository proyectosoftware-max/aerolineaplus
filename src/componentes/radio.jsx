

import React, { useState } from 'react';


const RadioButton = () => {
  const [selectedOption, setSelectedOption] = useState('oneWay');

  const handleChange = (event) => {
    setSelectedOption(event.target.value);
  };

  return (
    <div className="custom-radio-container">
      {/*<div className="form-check custom-radio">
        <input
          type="radio"
          id="roundTrip"
          name="tripType"
          value="roundTrip"
          className="form-check-input"
          checked={selectedOption === 'roundTrip'}
          onChange={handleChange}
        />
        <label className="form-check-label" htmlFor="roundTrip">
          Ida y vuelta
        </label>
      </div> */}

      <div className="form-check custom-radio">
        <input
          type="radio"
          id="oneWay"
          name="tripType"
          value="oneWay"
          className="form-check-input"
          checked={selectedOption}
          onChange={handleChange}
        />
        <label className="form-check-label" htmlFor="oneWay">
          Solo ida
        </label>
      </div>
    </div>
  );
};


export default RadioButton;