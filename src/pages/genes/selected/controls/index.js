import React from 'react';
import { connect } from 'react-redux';

import { deselectAllGenes } from '../../../../actions/genes';
import Clickable from '../../../../components/clickable';
import { downloadTsv } from '../../../../util/download';
import { humanizeKeys } from '../../../../util/object';

import { ReactComponent as CrossIcon } from '../../../../images/cross.svg';
import { ReactComponent as DownloadIcon } from '../../../../images/download.svg';

import './index.css';

// controls below selected genes table

let Controls = ({ selected, deselectAll }) => (
  <div className='controls'>
    <Clickable
      text='Deselect All'
      icon={<CrossIcon />}
      button
      onClick={deselectAll}
      aria-label='Deselect all genes'
    />
    <Clickable
      text='Download'
      icon={<DownloadIcon />}
      button
      onClick={() => downloadTsv(selected, 'genes')}
      aria-label='Download this table as a .tsv file'
    />
  </div>
);

const mapStateToProps = (state) => ({
  selected: state.gene.selected.map(humanizeKeys)
});

const mapDispatchToProps = (dispatch) => ({
  deselectAll: () => dispatch(deselectAllGenes())
});

Controls = connect(mapStateToProps, mapDispatchToProps)(Controls);

export default Controls;
