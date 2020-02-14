import React from 'react';
import { connect } from 'react-redux';

import Clickable from '../../../../components/clickable';
import { downloadTsv } from '../../../../util/download';
import { ungroupAllSamples } from '../../../../actions/samples';

import { ReactComponent as CrossIcon } from '../../../../images/cross.svg';
import { ReactComponent as DownloadIcon } from '../../../../images/download.svg';

import './index.css';

// controls below selected experiment samples table

let Controls = ({ samples, ungroupAll }) => (
  <div className='controls'>
    <Clickable
      text='Ungroup all'
      icon={<CrossIcon />}
      button
      onClick={ungroupAll}
      aria-label='Ungroup all samples'
    />
    <Clickable
      text='Download'
      icon={<DownloadIcon />}
      button
      onClick={() => downloadTsv(samples, 'samples')}
      aria-label='Download this table as a .tsv file'
    />
  </div>
);

const mapStateToProps = (state) => ({
  samples: state.experiment.selected.samples
});

const mapDispatchToProps = (dispatch) => ({
  ungroupAll: () => dispatch(ungroupAllSamples())
});

Controls = connect(mapStateToProps, mapDispatchToProps)(Controls);

export default Controls;
