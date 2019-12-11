import React from 'react';
import { connect } from 'react-redux';

import { selectFirstGenes } from '../../../../actions/genes.js';
import { deselectFirstGenes } from '../../../../actions/genes.js';
import ButtonText from '../../../../components/button-text';

import './index.css';

let MultiControls = ({ selectFirstGenes, deselectFirstGenes }) => (
  <div className='gene_search_results_multi_controls'>
    <ButtonText text='select' onClick={selectFirstGenes} />
    /
    <ButtonText text='deselect' onClick={deselectFirstGenes} />
    <span>first results</span>
  </div>
);

const mapDispatchToProps = (dispatch) => ({
  selectFirstGenes: () => dispatch(selectFirstGenes()),
  deselectFirstGenes: () => dispatch(deselectFirstGenes())
});

MultiControls = connect(null, mapDispatchToProps)(MultiControls);

export default MultiControls;
