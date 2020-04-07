import React from 'react';
import { connect } from 'react-redux';

import FetchAlert from '../../../components/fetch-alert';
import Plot from './plot';
import Controls from './controls';
import { isArray } from '../../../util/types';
import { isString } from '../../../util/types';

import './index.css';

// volcano plot section

let Volcano = ({ sampleVolcano }) => (
  <>
    {isString(sampleVolcano) && (
      <FetchAlert status={sampleVolcano} subject='volcano data' />
    )}
    {isArray(sampleVolcano) && (
      <>
        <Plot />
        <Controls />
      </>
    )}
  </>
);

const mapStateToProps = (state) => ({
  sampleVolcano: state.samples.volcano
});

Volcano = connect(mapStateToProps)(Volcano);

export default Volcano;
