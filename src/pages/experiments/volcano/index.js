import React from 'react';
import { connect } from 'react-redux';

import FetchAlert from '../../../components/fetch-alert';
import Plot from './plot';
import Controls from './controls';
import { isArray } from '../../../util/types';
import { isString } from '../../../util/types';

import './index.css';

// volcano plot section

let Volcano = ({ volcano, diamond, spade }) => (
  <>
    {isString(volcano) && (
      <FetchAlert
        status={volcano}
        subject='volcano data'
        text={
          diamond.length < 2 || spade.length < 2 ?
            'Put at least two samples in each group' :
            ''
        }
      />
    )}
    {isArray(volcano) && (
      <>
        <Plot />
        <Controls />
      </>
    )}
  </>
);

const mapStateToProps = (state) => ({
  volcano: state.samples.volcano,
  diamond: state.samples.groups.diamond,
  spade: state.samples.groups.spade
});

Volcano = connect(mapStateToProps)(Volcano);

export default Volcano;
