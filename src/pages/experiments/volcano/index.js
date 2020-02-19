import React from 'react';
import { connect } from 'react-redux';

import Alert from '../../../components/alert';
import { isArray } from '../../../util/types';

import './index.css';

// volcano plot section

let Volcano = ({ anyData }) => (
  <>
    {anyData === false && (
      <Alert text='Not enough samples grouped to produce a plot' />
    )}
    {anyData === true && <>hi</>}
  </>
);

const mapStateToProps = (state) => ({
  anyData: isArray(state.sample.volcano) ? true : false
});

Volcano = connect(mapStateToProps)(Volcano);

export default Volcano;
