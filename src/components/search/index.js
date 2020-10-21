import React from 'react';
import PropTypes from 'prop-types';
import { useCallback } from 'react';
import { useState } from 'react';
import { useRef } from 'react';
import { useEffect } from 'react';
import { cloneElement } from 'react';

import Input from '../input';
import { useStorage } from '../../util/hooks';

import './index.css';

// search box component

// length: # of search results, used to handle keyboard result highlighting
// multi: whether or not box supports multi input
// expanded: whether or not box is expanded/collapsed (in multi-input state)

const Search = ({
  length = 0,
  multi = false,
  placeholder = '',
  multiPlaceholder = '',
  onSearch,
  onKeySelect,
  SingleComponent = <></>,
  MultiComponent = <></>,
  storageKey = ''
}) => {
  // internal state
  const [focused, setFocused] = useState(false);
  const [expanded, setExpanded] = useStorage(false, storageKey + 'expanded');
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const clearFunc = useRef(() => null);

  // change focused state
  const onFocus = useCallback(() => setFocused(true), []);
  const onBlur = useCallback(() => setFocused(false), []);

  // change expanded state
  const onChangeExpanded = useCallback(
    (expanded) => {
      setExpanded(expanded);
    },
    [setExpanded]
  );

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
        expanded={expanded}
        multiPlaceholder={multiPlaceholder}
        onChange={onSearch}
        onChangeExpanded={onChangeExpanded}
        onFocus={onFocus}
        onBlur={onBlur}
        getClearFunc={getClearFunc}
        storageKey={storageKey}
      />
      {!expanded && cloneElement(SingleComponent, { highlightedIndex })}
      {expanded && MultiComponent}
    </>
  );
};

Search.propTypes = {
  length: PropTypes.number,
  multi: PropTypes.bool,
  placeholder: PropTypes.string,
  multiPlaceholder: PropTypes.string,
  onSearch: PropTypes.func,
  onKeySelect: PropTypes.func,
  SingleComponent: PropTypes.node,
  MultiComponent: PropTypes.node,
  storageKey: PropTypes.string
};

export default Search;
