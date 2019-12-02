import React from 'react';
import { connect } from 'react-redux';

import Alert from '../../../components/alert';
import GeneResultSingle from '../../../components/gene-result-single';
import { selectGene } from '../../../actions/genes.js';
import { deselectGene } from '../../../actions/genes.js';

import './index.css';

const selector = (state) => ({
  geneResults: Array.isArray(state.geneResults) ?
    state.geneResults.map((geneResult) => ({
      id: geneResult.id,
      standardName: geneResult.standard_name,
      systematicName: geneResult.systematic_name,
      entrezId: geneResult.entrezid,
      description: geneResult.description
    })) :
    state.geneResults,
  fullGeneResults: state.geneResults,
  selectedGenes: state.selectedGenes
});

let GeneResults = ({
  geneResults,
  fullGeneResults,
  selectedGenes,
  dispatch
}) => {
  let content = <></>;
  if (Array.isArray(geneResults)) {
    content = (
      <div className='gene_results'>
        {geneResults.map((result, index, array) => {
          const selected = selectedGenes.some(
            (selectedGene) => selectedGene.id === result.id
          );
          const onClick = () =>
            dispatch(
              selected ?
                deselectGene({ id: result.id }) :
                selectGene({ gene: fullGeneResults[index] })
            );
          return (
            <React.Fragment key={index}>
              <GeneResultSingle
                selected={selected}
                onClick={onClick}
                {...result}
              />
              {index < array.length - 1 && <hr />}
            </React.Fragment>
          );
        })}
      </div>
    );
  } else if (geneResults === 'loading')
    content = <Alert text='Loading genes' loading />;
  else if (geneResults === 'empty')
    content = <Alert text='No genes found' />;
  else if (geneResults === 'error')
    content = <Alert text='Error getting genes' error />;

  return <>{content}</>;
};

GeneResults = connect(selector)(GeneResults);

export default GeneResults;
