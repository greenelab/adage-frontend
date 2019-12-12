import React from 'react';
import { connect } from 'react-redux';

import HorizontalLine from '../../../../components/horizontal-line';
import MultiRow from '../multi-row';
import MultiControls from '../multi-controls';
import { isArray } from '../../../../util/types.js';
import { mapGeneResult } from '../';

import './index.css';

let Multi = ({ searches }) => (
  <>
    <div className='search_results'>
      {searches.map((search, index, array) => (
        <React.Fragment key={index}>
          <MultiRow search={search} />
          {index < array.length - 1 && <HorizontalLine />}
        </React.Fragment>
      ))}
    </div>
    <MultiControls />
  </>
);

const mapStateToProps = (state) => ({
  searches: state.gene.searches.map((search) => ({
    query: search.query,
    results: isArray(search.results) ?
      search.results.map((result) => mapGeneResult(result, state)) :
      search.results
  }))
});

Multi = connect(mapStateToProps)(Multi);

export default Multi;
