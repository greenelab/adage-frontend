import React from 'react';
import RCSlider from 'rc-slider';

import './index.css';

const Slider = ({ title, value, onChange, min, max, step, reverse }) => {
  if (value > max)
    value = max;
  if (value < min)
    value = min;

  const marks = {};
  const percent = 0.075;

  marks[value] = value;
  if (Math.abs(value - min) > Math.abs(max - min) * percent)
    marks[min] = min;
  if (Math.abs(max - value) > Math.abs(max - min) * percent)
    marks[max] = max;

  return (
    <div className='slider' data-reverse={reverse}>
      <div>{title}</div>
      <RCSlider
        value={value}
        type='number'
        min={min}
        max={max}
        step={step}
        onChange={onChange}
        marks={marks}
      />
    </div>
  );
};

export default Slider;
