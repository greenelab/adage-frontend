import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { useDebounce } from 'use-debounce';
import RCSlider from 'rc-slider';

import './index.css';

const debounceDelay = 20;

const Slider = ({
  title,
  value,
  onChange,
  min,
  max,
  step,
  precision,
  reverse
}) => {
  let [internalValue, setInternalValue] = useState();
  const [debouncedValue] = useDebounce(internalValue, debounceDelay);

  useEffect(() => {
    setInternalValue(value);
  }, [value]);

  useEffect(() => {
    if (debouncedValue !== undefined)
      onChange(debouncedValue);
  }, [debouncedValue, onChange]);

  const onInternalChange = (value) => setInternalValue(value);

  if (internalValue > max)
    internalValue = max;
  if (internalValue < min)
    internalValue = min;

  const marks = {};
  const percent = 0.075;

  if (internalValue)
    marks[internalValue] = internalValue;
  if (Math.abs(internalValue - min) > Math.abs(max - min) * percent)
    marks[min] = min;
  if (Math.abs(max - internalValue) > Math.abs(max - min) * percent)
    marks[max] = max;

  for (const key of Object.keys(marks))
    marks[key] = marks[key].toFixed(precision || 0);

  return (
    <div className='slider' data-reverse={reverse}>
      <div>{title}</div>
      <RCSlider
        value={internalValue}
        type='number'
        min={min}
        max={max}
        step={step}
        onChange={onInternalChange}
        marks={marks}
      />
    </div>
  );
};

export default Slider;
