import React from 'react';
import { connect } from 'react-redux';

import { deselectAllGenes } from '../../../../actions/genes.js';
import Tooltip from '../../../../components/tooltip';
import Button from '../../../../components/button';
import { downloadTsv } from '../../../../util/download.js';
import { mapGeneSelectedDownload } from '../';

import { ReactComponent as Cross } from '../../../../images/cross.svg';
import { ReactComponent as Download } from '../../../../images/download.svg';

import './index.css';

let Controls = ({ selected, deselectAll }) => (
  <div className='gene_selected_controls'>
    <Tooltip text='Deselect all genes'>
      <Button text='Deselect All' icon={<Cross />} onClick={deselectAll} />
    </Tooltip>
    <Tooltip text='Download this table as a .tsv file'>
      <Button
        text='Download'
        icon={<Download />}
        onClick={() => downloadTsv(selected, 'genes')}
      />
    </Tooltip>
  </div>
);

const mapStateToProps = (state) => ({
  selected: state.gene.selected.map((selected) =>
    mapGeneSelectedDownload(selected)
  )
});

const mapDispatchToProps = (dispatch) => ({
  deselectAll: () => dispatch(deselectAllGenes())
});

Controls = connect(mapStateToProps, mapDispatchToProps)(Controls);

export default Controls;
