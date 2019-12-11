import React from 'react';
import { connect } from 'react-redux';

import SingleRow from '../single-row';
import Alert from '../../../../components/alert';
import HorizontalLine from '../../../../components/horizontal-line';
import { isArray } from '../../../../util/types.js';
import { isString } from '../../../../util/types.js';
import { selectGene } from '../../../../actions/genes.js';
import { deselectGene } from '../../../../actions/genes.js';

import './index.css';

let Single = ({ results, highlightedIndex, selectGene, deselectGene }) => (
  <div className='search_results'>
    {isArray(results) &&
      results.map((result, index, array) => (
        <React.Fragment key={index}>
          <SingleRow
            onClick={(id, selected) =>
              (selected ? deselectGene : selectGene)({ id: id })
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
      <Alert
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
      state.gene.searches[0].results.map((result) => {
        const keys = [
          'standard_name',
          'systematic_name',
          'entrezid',
          'description'
        ];
        const highlightedKey = result.max_similarity_field;
        return {
          id: result.id,
          selected: state.gene.selected.includes(result.id),
          cols: keys.map((key) => result[key]),
          highlightedCol: keys.findIndex((key) => key === highlightedKey)
        };
      }) :
      state.gene.searches[0].results :
    ''
});

const mapDispatchToProps = (dispatch) => ({
  selectGene: (...args) => dispatch(selectGene(...args)),
  deselectGene: (...args) => dispatch(deselectGene(...args))
});

Single = connect(mapStateToProps, mapDispatchToProps)(Single);

export default Single;
