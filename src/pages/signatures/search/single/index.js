import React from 'react';
import { connect } from 'react-redux';

import SingleTable from '../single-table';
import FetchAlert from '../../../../components/fetch-alert';
import { isArray } from '../../../../util/types';
import { isString } from '../../../../util/types';
import { mapSignatureResult } from '../';

import './index.css';

// component to show below search box when doing a single search

let Single = ({ signatureResults, highlightedIndex }) => (
  <>
    {isArray(signatureResults) && (
      <SingleTable
        results={signatureResults}
        highlightedIndex={highlightedIndex}
      />
    )}
    {isString(signatureResults) && (
      <FetchAlert
        className='search_results_single_alert'
        status={signatureResults}
        subject='signature results'
      />
    )}
  </>
);

const mapStateToProps = (state) => ({
  signatureResults: state.signatures.searches[0] ?
    isArray(state.signatures.searches[0].results) ?
      state.signatures.searches[0].results.map((result) =>
        mapSignatureResult(result, state)) :
      state.signatures.searches[0].results :
    ''
});

Single = connect(mapStateToProps)(Single);

export default Single;
