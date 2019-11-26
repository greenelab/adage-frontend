import React from 'react';
import { connect } from 'react-redux';

import Alert from '../../../components/alert';
import { getGeneResults } from '../../../reducers/genes.js';

import './index.css';

let Results = ({ genes, dispatch }) => {
  let content = <></>;
  if (Array.isArray(genes))
    content = <Content genes={genes} dispatch={dispatch} />;
  else if (genes === 'loading')
    content = <Alert text='Searching genes' loading />;
  else if (genes === 'empty')
    content = <Alert text='No genes found' />;
  else if (genes === 'error')
    content = <Alert text='Error getting genes' error />;

  return content;
};

Results = connect(getGeneResults)(Results);

export default Results;

const Content = ({ genes }) => (
  <div className='gene_results'>
    {genes.map((gene, index) => (
      <Result key={index} gene={gene} />
    ))}
  </div>
);

const Result = ({ gene }) => (
  <div className='gene_result'>
    <span>{gene['entrezid'] || ''}</span>
    <span>{gene['systematic_name'] || ''}</span>
    <span>{gene['entrezid'] || ''}</span>
    <span>{gene['description'] || ''}</span>
  </div>
);
