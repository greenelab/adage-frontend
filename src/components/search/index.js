import React from 'react';
import { useState } from 'react';
import { useRef } from 'react';
import { useEffect } from 'react';
import { cloneElement } from 'react';

import Input from '../input';

import './index.css';

const Search = ({
  length,
  multi,
  placeholder,
  multiPlaceholder,
  onSearch,
  onKeySelect,
  SingleComponent,
  MultiComponent
}) => {
  const [focused, setFocused] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [outlinedIndex, setHighlightedIndex] = useState(-1);
  const clearFunc = useRef(() => null);

  const onFocus = () => setFocused(true);
  const onBlur = () => setFocused(false);
  const onChangeExpanded = (expanded) => setExpanded(expanded);
  const getClearFunc = (func) => (clearFunc.current = func);

  const onKeyDown = (event) => {
    if (!focused || expanded || !length)
      return;

    switch (event.key) {
      case 'ArrowUp':
        event.preventDefault();
        if (outlinedIndex > 0)
          setHighlightedIndex(outlinedIndex - 1);
        break;

      case 'ArrowDown':
        event.preventDefault();
        if (outlinedIndex < length - 1)
          setHighlightedIndex(outlinedIndex + 1);
        break;

      case 'Enter':
        event.preventDefault();
        if (outlinedIndex < 0 || outlinedIndex > length - 1)
          break;
        onKeySelect(outlinedIndex);
        clearFunc.current();
        break;

      default:
        break;
    }
  };

  useEffect(() => {
    if (focused && !expanded && length)
      setHighlightedIndex(0);
    else
      setHighlightedIndex(-1);
  }, [expanded, focused, length]);

  useEffect(() => {
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  });

  return (
    <>
      <Input
        multi={multi}
        placeholder={placeholder}
        multiPlaceholder={multiPlaceholder}
        onChange={onSearch}
        onChangeExpanded={onChangeExpanded}
        onFocus={onFocus}
        onBlur={onBlur}
        getClearFunc={getClearFunc}
      />
      <div className='search_results'>
        {!expanded && cloneElement(SingleComponent, { outlinedIndex })}
        {expanded && MultiComponent}
      </div>
    </>
  );
};

export default Search;
