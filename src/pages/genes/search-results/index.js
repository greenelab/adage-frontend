import React from 'react';
import { connect } from 'react-redux';

import './index.css';

let SearchResults = ({ multi }) => (
  <div className='gene_search_results'>
    {!multi && 'single'}
    {multi && 'multi'}
  </div>
);

const selector = (state) => ({
  multi: state.gene.searches.length > 1
});

SearchResults = connect(selector)(SearchResults);

export default SearchResults;
