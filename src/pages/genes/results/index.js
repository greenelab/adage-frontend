import React from 'react';
import { connect } from 'react-redux';

import Alert from '../../../components/alert';
import GeneResultSingle from '../../../components/gene-result-single';
import { selectGene } from '../../../actions/genes.js';
import { deselectGene } from '../../../actions/genes.js';

import './index.css';

const selector = (state) => ({
  results: Array.isArray(state.genes.results) ?
    state.genes.results.map((result) => ({
      id: result.id,
      standardName: result.standard_name,
      systematicName: result.systematic_name,
      entrezId: result.entrezid,
      description: result.description
    })) :
    state.genes.results,
  selected: state.genes.selected
});

let GeneResults = ({
  results,
  selected,
  dispatch
}) => {
  let content = <></>;
  if (Array.isArray(results)) {
    content = (
      <div className='gene_results'>
        {results.map((result, index, array) => {
          const isSelected = selected.some(
            (select) => select === result.id
          );
          const onClick = () =>
            dispatch(
              isSelected ?
                deselectGene({ id: result.id }) :
                selectGene({ id: result.id })
            );
          return (
            <React.Fragment key={index}>
              <GeneResultSingle
                selected={isSelected}
                onClick={onClick}
                {...result}
              />
              {index < array.length - 1 && <hr />}
            </React.Fragment>
          );
        })}
      </div>
    );
  } else if (results === 'loading')
    content = <Alert text='Loading genes' loading />;
  else if (results === 'empty')
    content = <Alert text='No genes found' />;
  else if (results === 'error')
    content = <Alert text='Error getting genes' error />;

  return <>{content}</>;
};

GeneResults = connect(selector)(GeneResults);

export default GeneResults;
