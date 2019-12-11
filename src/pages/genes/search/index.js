import React from 'react';
import { useState } from 'react';
import { useRef } from 'react';
import { useEffect } from 'react';
import { connect } from 'react-redux';

import SearchBox from '../search-box';
import SearchResults from '../search-results';
import { selectGene } from '../../../actions/genes.js';
import { deselectGene } from '../../../actions/genes.js';
import { isArray } from '../../../util/types.js';

import './index.css';

export const SearchContext = React.createContext({});

let Search = ({ results, selectGene, deselectGene }) => {
  const [focused, setFocused] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const clearFunc = useRef(() => null);

  const length = results ? results.length : null;

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

        const highlightedResult = results[highlightedIndex];
        if (highlightedResult.selected)
          deselectGene({ id: highlightedResult.id });
        else
          selectGene({ id: highlightedResult.id });

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
    <SearchContext.Provider value={{ highlightedIndex }}>
      <SearchBox
        onBlur={onBlur}
        onFocus={onFocus}
        onChangeExpanded={onChangeExpanded}
        getClearFunc={getClearFunc}
      />
      <SearchResults multi={expanded} />
    </SearchContext.Provider>
  );
};

const mapStateToProps = (state) => ({
  results:
    state.gene.searches.length === 1 &&
    isArray(state.gene.searches[0].results) &&
    state.gene.searches[0].results.length ?
      state.gene.searches[0].results.map((result) => ({
        id: result.id,
        selected: state.gene.selected.includes(result.id)
      })) :
      null
});

const mapDispatchToProps = (dispatch) => ({
  selectGene: (...args) => dispatch(selectGene(...args)),
  deselectGene: (...args) => dispatch(deselectGene(...args))
});

Search = connect(mapStateToProps, mapDispatchToProps)(Search);

export default Search;
