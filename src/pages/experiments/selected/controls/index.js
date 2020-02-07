import React from 'react';
import { connect } from 'react-redux';

import Tooltip from '../../../../components/tooltip';
import Button from '../../../../components/button';
import { downloadTsv } from '../../../../util/download';
import { normalize } from '../../../../util/object';
import { ungroupAllSamples } from '../../../../actions/samples';

import { ReactComponent as CrossIcon } from '../../../../images/cross.svg';
import { ReactComponent as DownloadIcon } from '../../../../images/download.svg';

import './index.css';

// controls below selected experiment samples table

let Controls = ({ samples, ungroupAll }) => (
  <div className='experiment_selected_controls'>
    <Tooltip text='Ungroup all samples'>
      <Button
        text='Ungroup all'
        icon={<CrossIcon />}
        onClick={ungroupAll}
      />
    </Tooltip>
    <Tooltip text='Download this table as a .tsv file'>
      <Button
        text='Download'
        icon={<DownloadIcon />}
        onClick={() => downloadTsv(samples, 'samples')}
      />
    </Tooltip>
  </div>
);

const mapStateToProps = (state) => ({
  samples: (state.experiment.selected.samples || []).map((sample) =>
    normalize(sample, true)
  )
});

const mapDispatchToProps = (dispatch) => ({
  ungroupAll: () => dispatch(ungroupAllSamples())
});

Controls = connect(mapStateToProps, mapDispatchToProps)(Controls);

export default Controls;
