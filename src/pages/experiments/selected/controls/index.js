import React from 'react';
import { connect } from 'react-redux';

import Tooltip from '../../../../components/tooltip';
import Button from '../../../../components/button';
import { downloadTsv } from '../../../../util/download';
import { clean } from '../../../../util/object';

import { ReactComponent as DownloadIcon } from '../../../../images/download.svg';

import './index.css';

let Controls = ({ samples }) => (
  <div className='experiment_selected_controls'>
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
    clean(sample, true)
  )
});

Controls = connect(mapStateToProps)(Controls);

export default Controls;
