import React from 'react';
import { connect } from 'react-redux';

import SingleTable from '../single-table';
import FetchAlert from '../../../../components/fetch-alert';
import { isArray } from '../../../../util/types';
import { isString } from '../../../../util/types';
import { mapSignatureResult } from '../';

import './index.css';

// component to show below search box when doing a single search

let Single = ({ results, highlightedIndex }) => (
  <>
    {isArray(results) && (
      <SingleTable results={results} highlightedIndex={highlightedIndex} />
    )}
    {isString(results) && (
      <FetchAlert
        className='search_results_single_alert'
        status={results}
        subject='signature results'
      />
    )}
  </>
);

const mapStateToProps = (state) => ({
  results: state.signature.searches[0] ?
    isArray(state.signature.searches[0].results) ?
      state.signature.searches[0].results.map((result) =>
        mapSignatureResult(result, state)
      ) :
      state.signature.searches[0].results :
    ''
});

Single = connect(mapStateToProps)(Single);

export default Single;
