import React from 'react';
import PropTypes from 'prop-types';
import { useState } from 'react';
import { useEffect } from 'react';
import { useCallback } from 'react';
import { useDebounce } from 'use-debounce';

import Clickable from '../../components/clickable';
import { useStorage } from '../../util/hooks';
import { ReactComponent as ListMultipleIcon } from '../../images/list-multiple.svg';
import { ReactComponent as ListSingleIcon } from '../../images/list-single.svg';
import { ReactComponent as SearchIcon } from '../../images/search.svg';
import { ReactComponent as CrossIcon } from '../../images/cross.svg';

import './index.css';

const debounceDelay = 200;

// generic input component, capable of single line and multi-line input

const Input = ({
  className = '',
  multi = false,
  expanded = false,
  placeholder = '',
  multiPlaceholder = '',
  tooltip = 'Switch to single search',
  multiTooltip = 'Switch to multi search',
  storageKey = '',
  onChange = () => null,
  onChangeExpanded = () => null,
  onFocus = () => null,
  onBlur = () => null,
  getClearFunc = () => null,
  ...props
}) => {
  // internal state
  const [focused, setFocused] = useState(false);
  const [value, setValue] = useStorage('', storageKey + 'value');
  const [debouncedValue] = useDebounce(value, debounceDelay);

  // change value state
  const changeValue = useCallback(
    (newValue) => {
      if (expanded)
        newValue = newValue.split(/[\t|\r|,||]/).join('\n');
      else
        newValue = newValue.split('\n')[0];

      setValue(newValue);
    },
    [expanded, setValue]
  );

  // change expanded state
  const changeExpanded = useCallback(
    (newExpanded) => {
      let newValue = value;
      if (!newExpanded && newValue.includes('\n')) {
        newValue = newValue.split('\n')[0];
        changeValue(newValue);
      }

      onChangeExpanded(newExpanded);
    },
    [value, changeValue, onChangeExpanded]
  );

  // eslint-disable-next-line
  onChange = useCallback(onChange, []);

  // call parent's onChange event after debouncing value
  useEffect(() => {
    onChange(debouncedValue, expanded);
  }, [debouncedValue, expanded, onChange]);

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
        <Clickable
          className='input_button'
          icon={expanded ? <ListSingleIcon /> : <ListMultipleIcon />}
          button
          onClick={() => changeExpanded(!expanded)}
          aria-label={expanded ? tooltip : multiTooltip}
          data-tooltip-h-align='right'
        />
      )}
      {value.length > 0 && (
        <Clickable
          className='input_button'
          icon={<CrossIcon />}
          button
          onClick={() => changeValue('')}
          aria-label='Clear search'
          data-tooltip-h-align='right'
        />
      )}
      {value.length === 0 && (
        <div className='input_button'>
          <SearchIcon />
        </div>
      )}
    </div>
  );
};

Input.propTypes = {
  className: PropTypes.string,
  multi: PropTypes.bool,
  expanded: PropTypes.bool,
  placeholder: PropTypes.string,
  multiPlaceholder: PropTypes.string,
  storageKey: PropTypes.string,
  onChange: PropTypes.func,
  onChangeExpanded: PropTypes.func,
  onFocus: PropTypes.func,
  onBlur: PropTypes.func,
  getClearFunc: PropTypes.func
};

export default Input;
