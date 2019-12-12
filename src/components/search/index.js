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
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
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
      {!expanded && cloneElement(SingleComponent, { highlightedIndex })}
      {expanded && MultiComponent}
    </>
  );
};

export default Search;
