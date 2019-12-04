import React from 'react';
import { connect } from 'react-redux';

import Alert from '../../../../components/alert';
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
            {...result}
            onClick={(id, selected) =>
              dispatch((selected ? deselectGene : selectGene)({ id: id }))
            }
          />
          {index < array.length - 1 && <hr />}
        </React.Fragment>
      ))}
    {isString(results) && (
      <Alert
        className='gene_search_results_alert'
        status={results}
        subject='gene results'
      />
    )}
  </>
);

const selector = (state) => ({
  results: isArray(state.gene.searches[0]) ?
    state.gene.searches[0].map((result) => ({
      id: result.id,
      selected: state.gene.selected.includes(result.id),
      col1: result.standard_name,
      col2: result.systematic_name,
      col3: result.entrezid,
      col4: result.description
    })) :
    state.gene.searches[0]
});

Single = connect(selector)(Single);

export default Single;
