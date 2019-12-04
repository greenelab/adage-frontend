import React from 'react';
import { connect } from 'react-redux';

import Alert from '../../../components/alert';
import GeneResultSingle from '../../../components/gene-result-single';
import GeneResultMulti from '../../../components/gene-result-multi';
import { selectGene } from '../../../actions/genes.js';
import { deselectGene } from '../../../actions/genes.js';

import './index.css';

let MultiResults = ({ searches, selected, dispatch }) => (
  <div className='gene_results'>
    {searches.map((search, index) => (
      <MultiResult search={search} key={index} />
    ))}
  </div>
);
const selector = (state) => ({
  searches: state.gene.searches,
  selected: state.gene.selected
});

MultiResults = connect(selector)(MultiResults);

export default MultiResults;

const MultiResult = ({ search }) => {
  let content = <></>;
  if (Array.isArray(search)) {
    content = (
      <GeneResultMulti
        search=''
        result1={search[0]}
        result2={search[1]}
        result3={search[2]}
      />
    );
  } else if (search === 'loading')
    content = <Alert text='Loading genes' loading />;
  else if (search === 'empty')
    content = <Alert text='No genes found' />;
  else if (search === 'error')
    content = <Alert text='Error getting genes' error />;

  return content;
};
