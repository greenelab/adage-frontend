import React from 'react';
import { connect } from 'react-redux';

import Single from './single';
import Multi from './multi';

import './index.css';

let SearchResults = ({ searches }) => (
  <div className='gene_search_results'>
    {searches === 1 && <Single />}
    {searches > 1 && <Multi />}
  </div>
);

const selector = (state) => ({
  searches: state.gene.searches.length
});

SearchResults = connect(selector)(SearchResults);

export default SearchResults;
