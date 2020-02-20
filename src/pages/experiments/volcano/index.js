import React from 'react';
import { connect } from 'react-redux';

import FetchAlert from '../../../components/fetch-alert';
import Plot from './plot';
import { isArray } from '../../../util/types';
import { isString } from '../../../util/types';

import './index.css';

// volcano plot section

let Volcano = ({ volcano }) => (
  <>
    {isString(volcano) && (
      <FetchAlert status={volcano} subject='volcano data' />
    )}
    {isArray(volcano) && (
      <>
        <Plot />
      </>
    )}
  </>
);

const mapStateToProps = (state) => ({
  volcano: state.sample.volcano
});

Volcano = connect(mapStateToProps)(Volcano);

export default Volcano;
