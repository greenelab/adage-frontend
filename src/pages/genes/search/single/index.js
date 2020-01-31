import React from 'react';
import { connect } from 'react-redux';

import SingleTable from '../single-table';
import FetchAlert from '../../../../components/fetch-alert';
import { isArray } from '../../../../util/types.js';
import { isString } from '../../../../util/types.js';
import { mapGeneResult } from '../';

import './index.css';

let Single = ({ results, highlightedIndex }) => (
  <>
    {isArray(results) && (
      <SingleTable results={results} highlightedIndex={highlightedIndex} />
    )}
    {isString(results) && (
      <FetchAlert
        className='gene_search_results_single_alert'
        status={results}
        subject='gene results'
      />
    )}
  </>
);

const mapStateToProps = (state) => ({
  results: state.gene.searches[0] ?
    isArray(state.gene.searches[0].results) ?
      state.gene.searches[0].results.map((result) =>
        mapGeneResult(result, state)
      ) :
      state.gene.searches[0].results :
    ''
});

Single = connect(mapStateToProps)(Single);

export default Single;
