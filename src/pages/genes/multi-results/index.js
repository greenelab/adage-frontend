import React from 'react';
import { connect } from 'react-redux';

import Alert from '../../../components/alert';
import GeneResultSingle from '../../../components/gene-result-single';
import { selectGene } from '../../../actions/genes.js';
import { deselectGene } from '../../../actions/genes.js';

import './index.css';

let MultiResults = ({ searches, selected, dispatch }) => {
  const list = searches.map((search, index) => {
    let content = <React.Fragment key={index}></React.Fragment>;
    if (Array.isArray(search)) {
      content = (
        <div key={index}>
          {search[0].search} - 
          {search[0].systematic_name} - 
          {search[1].systematic_name}
        </div>
      );
    } else if (search === 'loading')
      content = <Alert key={index} text='Loading genes' loading />;
    else if (search === 'empty')
      content = <Alert key={index} text='No genes found' />;
    else if (search === 'error')
      content = <Alert key={index} text='Error getting genes' error />;

    return content;
  });

  return <div className='gene_results'>{list}</div>;
};

const selector = (state) => ({
  searches: state.gene.searches,
  selected: state.gene.selected
});

MultiResults = connect(selector)(MultiResults);

export default MultiResults;
