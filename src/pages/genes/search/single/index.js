import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { connect } from 'react-redux';

import SingleRow from '../single-row';
import SingleControls from '../single-controls';
import Alert from '../../../../components/alert';
import HorizontalLine from '../../../../components/horizontal-line';
import { isArray } from '../../../../util/types.js';
import { isString } from '../../../../util/types.js';
import { selectGene } from '../../../../actions/genes.js';
import { deselectGene } from '../../../../actions/genes.js';

import './index.css';

const collapsedResultLimit = 5;
const expandedResultLimit = 20;

let Single = ({
  results,
  outlinedIndex,
  selectGene,
  deselectGene,
  onChangeLength
}) => {
  const [expanded, setExpanded] = useState(false);

  useEffect(
    () =>
      onChangeLength(
        Math.min(
          results.length,
          expanded ? expandedResultLimit : collapsedResultLimit
        )
      ),
    [onChangeLength, results, expanded]
  );

  return (
    <>
      {isArray(results) &&
        results
          .slice(0, expanded ? expandedResultLimit : collapsedResultLimit)
          .map((result, index, array) => (
            <React.Fragment key={index}>
              <SingleRow
                onClick={(id, selected) =>
                  (selected ? deselectGene : selectGene)({ id: id })
                }
                id={result.id}
                selected={result.selected}
                cols={result.cols}
                highlightedCol={result.highlightedCol}
                outlined={index === outlinedIndex}
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
      <SingleControls expanded={expanded} setExpanded={setExpanded} />
    </>
  );
};

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
