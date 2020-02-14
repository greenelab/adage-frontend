import React from 'react';
import { connect } from 'react-redux';

import Button from '../../../../components/button';
import { downloadTsv } from '../../../../util/download';
import { ungroupAllSamples } from '../../../../actions/samples';

import { ReactComponent as CrossIcon } from '../../../../images/cross.svg';
import { ReactComponent as DownloadIcon } from '../../../../images/download.svg';

import './index.css';

// controls below selected experiment samples table

let Controls = ({ samples, ungroupAll }) => (
  <div className='controls'>
    <Button
      text='Ungroup all'
      icon={<CrossIcon />}
      onClick={ungroupAll}
      aria-label='Ungroup all samples'
    />
    <Button
      text='Download'
      icon={<DownloadIcon />}
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
