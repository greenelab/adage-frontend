import React from 'react';
import { connect } from 'react-redux';

import SingleTable from '../single-table';
import FetchAlert from '../../../../components/fetch-alert';
import { isArray } from '../../../../util/types';
import { isString } from '../../../../util/types';
import { mapGeneSearch } from '../';

import './index.css';

// component to show below search box when doing a single search

let Single = ({ geneResults, highlightedIndex }) => (
  <>
    {isArray(geneResults) && (
      <SingleTable results={geneResults} highlightedIndex={highlightedIndex} />
    )}
    {isString(geneResults) && (
      <FetchAlert
        className='search_results_single_alert'
        status={geneResults}
        subject='gene results'
      />
    )}
  </>
);

const mapStateToProps = (state) => ({
  geneResults: mapGeneSearch(state.genes.searches[0] || {}, state)?.results
});

Single = connect(mapStateToProps)(Single);

export default Single;
