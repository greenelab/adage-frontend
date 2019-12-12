import React from 'react';
import { connect } from 'react-redux';

import { selectFirstGenes } from '../../../../actions/genes.js';
import { deselectFirstGenes } from '../../../../actions/genes.js';
import Button from '../../../../components/button';

import './index.css';

let MultiControls = ({ selectFirstGenes, deselectFirstGenes }) => (
  <div className='gene_search_results_multi_controls'>
    <Button text='select' onClick={selectFirstGenes} />
    /
    <Button text='deselect' onClick={deselectFirstGenes} />
    <span>first results</span>
  </div>
);

const mapDispatchToProps = (dispatch) => ({
  selectFirstGenes: () => dispatch(selectFirstGenes()),
  deselectFirstGenes: () => dispatch(deselectFirstGenes())
});

MultiControls = connect(null, mapDispatchToProps)(MultiControls);

export default MultiControls;
