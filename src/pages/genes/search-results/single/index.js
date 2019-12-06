import React from 'react';
import { connect } from 'react-redux';

import Alert from '../../../../components/alert';
import HorizontalLine from '../../../../components/horizontal-line';
import SingleRow from '../single-row';
import { isArray } from '../../../../util/types.js';
import { isString } from '../../../../util/types.js';
import { selectGene } from '../../../../actions/genes.js';
import { deselectGene } from '../../../../actions/genes.js';

import './index.css';

let Single = ({ results, dispatch }) => (
  <>
    {isArray(results) &&
      results.map((result, index, array) => (
        <React.Fragment key={index}>
          <SingleRow
            onClick={(id, selected) =>
              dispatch((selected ? deselectGene : selectGene)({ id: id }))
            }
            id={result.id}
            selected={result.selected}
            col1={result.standardName}
            col2={result.systematicName}
            col3={result.entrezId}
            col4={result.description}
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
  </>
);

const selector = (state) => ({
  results: isArray(state.gene.searches[0].results) ?
    state.gene.searches[0].results.map((result) => ({
      id: result.id,
      selected: state.gene.selected.includes(result.id),
      standardName: result.standard_name,
      systematicName: result.systematic_name,
      entrezId: result.entrezid,
      description: result.description
    })) :
    state.gene.searches[0].results
});

Single = connect(selector)(Single);

export default Single;
