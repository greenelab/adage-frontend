import React from 'react';
import { connect } from 'react-redux';

import { deselectAllGenes } from '../../../../actions/genes';
import Button from '../../../../components/button';
import { downloadTsv } from '../../../../util/download';
import { humanizeKeys } from '../../../../util/object';

import { ReactComponent as CrossIcon } from '../../../../images/cross.svg';
import { ReactComponent as DownloadIcon } from '../../../../images/download.svg';

import './index.css';

// controls below selected genes table

let Controls = ({ selected, deselectAll }) => (
  <div className='controls'>
    <Button
      text='Deselect All'
      icon={<CrossIcon />}
      onClick={deselectAll}
      aria-label='Deselect all genes'
    />
    <Button
      text='Download'
      icon={<DownloadIcon />}
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
