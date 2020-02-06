import React from 'react';
import { useCallback } from 'react';
import { useState } from 'react';
import { useRef } from 'react';
import { useEffect } from 'react';
import { cloneElement } from 'react';

import Input from '../input';

import './index.css';

// search box component

const Search = ({
  length = 0,
  multi = false,
  placeholder = '',
  multiPlaceholder = '',
  onSearch,
  onKeySelect,
  SingleComponent = <></>,
  MultiComponent = <></>
}) => {
  // internal state
  const [focused, setFocused] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const clearFunc = useRef(() => null);

  // change focused state
  const onFocus = useCallback(() => setFocused(true), []);
  const onBlur = useCallback(() => setFocused(false), []);

  // change expanded state
  const onChangeExpanded = useCallback((expanded) => setExpanded(expanded), []);

  const getClearFunc = useCallback((func) => (clearFunc.current = func), []);

  // on key press
  const onKeyDown = useCallback(
    (event) => {
      if (!focused || expanded || !length)
        return;

      switch (event.key) {
        case 'ArrowUp':
          event.preventDefault();
          if (highlightedIndex > 0)
            setHighlightedIndex(highlightedIndex - 1);
          break;

        case 'ArrowDown':
          event.preventDefault();
          if (highlightedIndex < length - 1)
            setHighlightedIndex(highlightedIndex + 1);
          break;

        case 'Enter':
          event.preventDefault();
          if (highlightedIndex < 0 || highlightedIndex > length - 1)
            break;
          onKeySelect(highlightedIndex);
          clearFunc.current();
          break;

        default:
          break;
      }
    },
    [focused, expanded, highlightedIndex, length, onKeySelect]
  );

  // update highlighted index
  useEffect(() => {
    if (focused && !expanded && length)
      setHighlightedIndex(0);
    else
      setHighlightedIndex(-1);
  }, [expanded, focused, length]);

  // key listener
  useEffect(() => {
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [onKeyDown]);

  return (
    <>
      <Input
        className='search_bar'
        multi={multi}
        placeholder={placeholder}
        multiPlaceholder={multiPlaceholder}
        onChange={onSearch}
        onChangeExpanded={onChangeExpanded}
        onFocus={onFocus}
        onBlur={onBlur}
        getClearFunc={getClearFunc}
      />
      {!expanded && cloneElement(SingleComponent, { highlightedIndex })}
      {expanded && MultiComponent}
    </>
  );
};

export default Search;
