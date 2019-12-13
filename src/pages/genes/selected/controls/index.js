import React from 'react';
import { connect } from 'react-redux';

import { deselectAllGenes } from '../../../../actions/genes.js';
import Button from '../../../../components/button';
import { isArray } from '../../../../util/types.js';
import { downloadTsv } from '../../../../util/download.js';
import { mapGeneSelected } from '../';

import { ReactComponent as Cross } from '../../../../images/cross.svg';
import { ReactComponent as Download } from '../../../../images/download.svg';

import './index.css';

let Controls = ({ selected, deselectAllGenes }) => (
  <div className='gene_selected_controls'>
    <Button text='Deselect All' icon={<Cross />} onClick={deselectAllGenes} />
    <Button
      text='Download'
      icon={<Download />}
      onClick={() => downloadTsv(selected, 'genes')}
    />
  </div>
);

const mapStateToProps = (state) => ({
  selected: isArray(state.gene.selected) ?
    state.gene.selected.map((selected) => mapGeneSelected(selected)) :
    []
});

const mapDispatchToProps = (dispatch) => ({
  deselectAllGenes: () => dispatch(deselectAllGenes())
});

Controls = connect(mapStateToProps, mapDispatchToProps)(Controls);

export default Controls;
