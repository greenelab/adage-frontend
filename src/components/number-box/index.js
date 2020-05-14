import React from 'react';
import PropTypes from 'prop-types';
import { useState } from 'react';

import './index.css';

// generic number box component, capable of single line and multi-line input

const NumberBox = ({
  className = '',
  onChange = () => null,
  value,
  min = 0,
  max = 1,
  step = 0.01,
  ...props
}) => {
  // internal state
  const [focused, setFocused] = useState(false);

  return (
    <div className={'input ' + className} data-focused={focused}>
      <input
        {...props}
        type='number'
        value={value}
        min={min}
        max={max}
        step={step}
        onChange={(event) => onChange(Number(event.target.value))}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
      />
    </div>
  );
};

NumberBox.propTypes = {
  className: PropTypes.string,
  onChange: PropTypes.func,
  value: PropTypes.number,
  min: PropTypes.number,
  max: PropTypes.number,
  step: PropTypes.number
};

export default NumberBox;
