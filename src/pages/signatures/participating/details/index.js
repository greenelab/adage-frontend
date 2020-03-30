import React from 'react';
import { connect } from 'react-redux';

import './index.css';

import { ReactComponent as SignatureIcon } from '../../../../images/signature.svg';

// main details of selected signature

let Details = ({ signature }) => (
  <div className='signature_info medium'>
    <span>
      <SignatureIcon />
      {signature.name}
    </span>
  </div>
);

const mapStateToProps = (state) => ({
  signature: state.signatures.selected
});

Details = connect(mapStateToProps)(Details);

export default Details;
