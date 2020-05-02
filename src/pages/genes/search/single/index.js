import React from 'react';
import { connect } from 'react-redux';

import SingleTable from '../single-table';
import FetchAlert from '../../../../components/fetch-alert';
import { isArray } from '../../../../util/types';
import { isString } from '../../../../util/types';
import { mapGeneSearch } from '../';

import './index.css';

// component to show below search box when doing a single search

let Single = ({ results, highlightedIndex }) => (
  <>
    {isArray(results) && (
      <>
        <SingleTable results={results} highlightedIndex={highlightedIndex} />
        <div className='search_results_note'>
          <span
            className='size_small'
            aria-label='Search to find specific result'
          >
            Top {results.length} results
          </span>
        </div>
      </>
    )}
    {isString(results) && (
      <FetchAlert
        className='search_results_single_alert'
        status={results}
        subject='gene results'
      />
    )}
  </>
);

const mapStateToProps = (state) => ({
  results: mapGeneSearch(state.genes.searches[0] || {}, state)?.results
});

Single = connect(mapStateToProps)(Single);

export default Single;
