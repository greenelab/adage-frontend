import React from 'react';
import { connect } from 'react-redux';

import Alert from '../../../components/alert';
import GeneResultSingle from '../../../components/gene-result-single';
import { selectGene } from '../../../actions/genes.js';
import { deselectGene } from '../../../actions/genes.js';

import './index.css';

let SingleResults = ({ search, selected, dispatch }) => {
  let content = <></>;
  if (Array.isArray(search)) {
    content = search.map((result, index, array) => {
      const isSelected = selected.some((select) => select === result.id);
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
    });
  } else if (search === 'loading')
    content = <Alert text='Loading genes' loading />;
  else if (search === 'empty')
    content = <Alert text='No genes found' />;
  else if (search === 'error')
    content = <Alert text='Error getting genes' error />;

  return <div className='gene_results'>{content}</div>;
};

const selector = (state) => ({
  search: Array.isArray(state.gene.searches[0]) ?
    state.gene.searches[0].map((result) => ({
      id: result.id,
      standardName: result.standard_name,
      systematicName: result.systematic_name,
      entrezId: result.entrezid,
      description: result.description
    })) :
    state.gene.searches[0],
  selected: state.gene.selected
});

SingleResults = connect(selector)(SingleResults);

export default SingleResults;
