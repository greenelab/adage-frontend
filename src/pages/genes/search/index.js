import React from 'react';
import { useState } from 'react';

import SearchBox from '../search-box';
import SearchResults from '../search-results';

import './index.css';

const Search = () => {
  return (
    <>
      <SearchBox />
      <SearchResults />
    </>
  );
};

export default Search;
