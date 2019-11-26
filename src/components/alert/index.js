import React from 'react';

import { ReactComponent as AlertIcon } from '../../images/alert.svg';
import { ReactComponent as Loading } from '../../images/loading.svg';

import './index.css';

const Alert = ({ text, loading, error }) => (
  <div className='alert' data-error={error}>
    {loading && <Loading />}
    {!loading && <AlertIcon />}
    <span>{text}</span>
  </div>
);

export default Alert;
