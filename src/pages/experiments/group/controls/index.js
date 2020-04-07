import React from 'react';
import { connect } from 'react-redux';

import Clickable from '../../../../components/clickable';
import { downloadTable } from './download';
import { ungroupAllSamples } from '../../../../actions/samples';
import { makeMapDispatchToProps } from '../../../../actions';

import { ReactComponent as CrossIcon } from '../../../../images/cross.svg';
import { ReactComponent as DownloadIcon } from '../../../../images/download.svg';

import './index.css';

// controls below selected experiment samples table

let Controls = ({ selectedSamples, ungroupAllSamples }) => (
  <div className='controls'>
    <Clickable
      text='Ungroup all'
      icon={<CrossIcon />}
      button
      onClick={ungroupAllSamples}
      aria-label='Ungroup all samples'
    />
    <Clickable
      text='Download'
      icon={<DownloadIcon />}
      button
      onClick={() => downloadTable({ selectedSamples })}
      aria-label='Download this table as a .tsv file'
    />
  </div>
);

const mapStateToProps = (state) => ({
  selectedSamples: state.samples.selected
});

const mapDispatchToProps = makeMapDispatchToProps({ ungroupAllSamples });

Controls = connect(mapStateToProps, mapDispatchToProps)(Controls);

export default Controls;
