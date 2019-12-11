import React from 'react';
import { connect } from 'react-redux';

import Single from './single';
import Multi from './multi';

import './index.css';

let SearchResults = ({ searches, multi }) => (
  <div className='gene_search_results'>
    {searches > 0 && !multi && <Single />}
    {searches > 0 && multi && <Multi />}
  </div>
);

const mapStateToProps = (state) => ({
  searches: state.gene.searches.length
});

SearchResults = connect(mapStateToProps)(SearchResults);

export default SearchResults;
