import React from 'react';
import { connect } from 'react-redux';

import Tooltip from '../../../../components/tooltip';
import Button from '../../../../components/button';
import { downloadTsv } from '../../../../util/download.js';

import { ReactComponent as Download } from '../../../../images/download.svg';

import './index.css';
import { humanizeObject, flattenObject } from '../../../../util/object';

let Controls = ({ samples }) => (
  <div className='experiment_selected_controls'>
    <Tooltip text='Download this table as a .tsv file'>
      <Button
        text='Download'
        icon={<Download />}
        onClick={() => downloadTsv(samples, 'samples')}
      />
    </Tooltip>
  </div>
);

const mapStateToProps = (state) => ({
  samples: (state.experiment.selected.samples || []).map((sample) =>
    humanizeObject(flattenObject(sample))
  )
});

Controls = connect(mapStateToProps)(Controls);

export default Controls;
