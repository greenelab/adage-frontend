import React from 'react';
import PropTypes from 'prop-types';
import { useState } from 'react';
import { useEffect } from 'react';
import { useCallback } from 'react';
import { useDebounce } from 'use-debounce';

import Tooltip from '../../components/tooltip';
import Button from '../../components/button';
import { ReactComponent as ListMultiple } from '../../images/list-multiple.svg';
import { ReactComponent as ListSingle } from '../../images/list-single.svg';
import { ReactComponent as Search } from '../../images/search.svg';
import { ReactComponent as Cross } from '../../images/cross.svg';

import './index.css';

const debounceDelay = 200;

const Input = ({
  className = '',
  onChange = () => null,
  onChangeExpanded = () => null,
  onFocus = () => null,
  onBlur = () => null,
  getClearFunc = () => null,
  multi = false,
  placeholder = '',
  multiPlaceholder = '',
  tooltip = 'Switch to single search',
  multiTooltip = 'Switch to multi search',
  ...props
}) => {
  const [focused, setFocused] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [value, setValue] = useState('');
  const [debouncedValue] = useDebounce(value, debounceDelay);

  const changeExpanded = (newExpanded) => {
    let newValue = value;
    if (!newExpanded && newValue.includes('\n')) {
      newValue = newValue.split('\n')[0];
      changeValue(newValue);
    }

    setExpanded(newExpanded);
    onChangeExpanded(newExpanded);
  };

  const changeValue = (newValue) => {
    if (expanded)
      newValue = newValue.split(/[\t|\r|,||]/).join('\n');
    else
      newValue = newValue.split('\n')[0];

    setValue(newValue);
  };

  onChange = useCallback(onChange, []);

  useEffect(() => {
    onChange(debouncedValue);
  }, [onChange, debouncedValue]);

  getClearFunc(() => changeValue(''));

  return (
    <div
      className={'input ' + className}
      data-focused={focused}
      data-expanded={expanded}
    >
      {!expanded && (
        <input
          {...props}
          value={value}
          onChange={(event) => changeValue(event.target.value)}
          onFocus={() => {
            onFocus();
            setFocused(true);
          }}
          onBlur={() => {
            onBlur();
            setFocused(false);
          }}
          placeholder={expanded ? multiPlaceholder : placeholder}
        />
      )}
      {expanded && (
        <textarea
          {...props}
          value={value}
          onChange={(event) => changeValue(event.target.value)}
          onFocus={() => {
            onFocus();
            setFocused(true);
          }}
          onBlur={() => {
            onBlur();
            setFocused(false);
          }}
          placeholder={expanded ? multiPlaceholder : placeholder}
        />
      )}
      {multi && (
        <Tooltip
          text={expanded ? tooltip : multiTooltip}
          horizontalAlign='right'
        >
          <Button
            className='input_button'
            icon={expanded ? <ListSingle /> : <ListMultiple />}
            onClick={() => changeExpanded(!expanded)}
          />
        </Tooltip>
      )}
      {value.length > 0 && (
        <Tooltip text={'Clear search'} horizontalAlign='right'>
          <Button
            className='input_button'
            icon={<Cross />}
            onClick={() => changeValue('')}
          />
        </Tooltip>
      )}
      {value.length === 0 && (
        <div className='input_button'>
          <Search />
        </div>
      )}
    </div>
  );
};

Input.propTypes = {
  className: PropTypes.string,
  onChange: PropTypes.func,
  onChangeExpanded: PropTypes.func,
  onFocus: PropTypes.func,
  onBlur: PropTypes.func,
  getClearFunc: PropTypes.func,
  multi: PropTypes.bool,
  placeholder: PropTypes.string,
  multiPlaceholder: PropTypes.string
};

export default Input;
