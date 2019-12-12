import React from 'react';
import { connect } from 'react-redux';

import SingleRow from '../single-row';
import FetchAlert from '../../../../components/fetch-alert';
import HorizontalLine from '../../../../components/horizontal-line';
import { isArray } from '../../../../util/types.js';
import { isString } from '../../../../util/types.js';
import { selectGene } from '../../../../actions/genes.js';
import { deselectGene } from '../../../../actions/genes.js';
import { mapGeneResult } from '../';

import './index.css';

let Single = ({ results, highlightedIndex, selectGene, deselectGene }) => (
  <div className='search_results'>
    {isArray(results) &&
      results.map((result, index, array) => (
        <React.Fragment key={index}>
          <SingleRow
            onClick={() =>
              (result.selected ? deselectGene : selectGene)({
                gene: result.raw
              })
            }
            id={result.id}
            selected={result.selected}
            cols={result.cols}
            highlighted={index === highlightedIndex}
            highlightedCol={result.highlightedCol}
          />
          {index < array.length - 1 && <HorizontalLine />}
        </React.Fragment>
      ))}
    {isString(results) && (
      <FetchAlert
        className='gene_search_results_single_alert'
        status={results}
        subject='gene results'
      />
    )}
  </div>
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

const mapDispatchToProps = (dispatch) => ({
  selectGene: (...args) => dispatch(selectGene(...args)),
  deselectGene: (...args) => dispatch(deselectGene(...args))
});

Single = connect(mapStateToProps, mapDispatchToProps)(Single);

export default Single;
