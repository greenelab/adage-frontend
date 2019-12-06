import React from 'react';
import { connect } from 'react-redux';

import { selectFirstGenes } from '../../../../actions/genes.js';
import { deselectFirstGenes } from '../../../../actions/genes.js';
import ButtonText from '../../../../components/button-text';

import './index.css';

let MultiControls = ({ dispatch }) => (
  <div className='gene_search_results_multi_controls'>
    <ButtonText text='select' onClick={() => dispatch(selectFirstGenes())} />
    /
    <ButtonText
      text='deselect'
      onClick={() => dispatch(deselectFirstGenes())}
    />
    <span>first results</span>
  </div>
);

MultiControls = connect()(MultiControls);

export default MultiControls;
