import React from 'react';
import { connect } from 'react-redux';

import './index.css';

import { ReactComponent as SignatureIcon } from '../../../../images/signature.svg';

// main details of selected signature

let Details = ({ selectedSignature }) => (
  <div className='info medium'>
    <span>
      <SignatureIcon />
      {selectedSignature.name}
    </span>
  </div>
);

const mapStateToProps = (state) => ({
  selectedSignature: state.signatures.selected
});

Details = connect(mapStateToProps)(Details);

export default Details;
