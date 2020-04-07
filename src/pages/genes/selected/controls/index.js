import React from 'react';
import { connect } from 'react-redux';

import Clickable from '../../../../components/clickable';
import { deselectAllGenes } from '../../../../actions/genes';
import { makeMapDispatchToProps } from '../../../../actions';
import { downloadTable } from './download';

import { ReactComponent as CrossIcon } from '../../../../images/cross.svg';
import { ReactComponent as DownloadIcon } from '../../../../images/download.svg';

import './index.css';

// controls below selected genes table

let Controls = ({ selectedGenes, deselectAllGenes }) => (
  <div className='controls'>
    <Clickable
      text='Deselect All'
      icon={<CrossIcon />}
      button
      onClick={deselectAllGenes}
      aria-label='Deselect all genes'
    />
    <Clickable
      text='Download'
      icon={<DownloadIcon />}
      button
      onClick={() => downloadTable({ selectedGenes })}
      aria-label='Download this table as a .tsv file'
    />
  </div>
);

const mapStateToProps = (state) => ({
  selectedGenes: state.genes.selected
});

const mapDispatchToProps = makeMapDispatchToProps({ deselectAllGenes });

Controls = connect(mapStateToProps, mapDispatchToProps)(Controls);

export default Controls;
