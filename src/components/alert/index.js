import React from 'react';
import PropTypes from 'prop-types';

import { ReactComponent as AlertIcon } from '../../images/alert.svg';
import { ReactComponent as Loading } from '../../images/loading.svg';

import './index.css';

const Alert = ({ status = '', subject = '', className = '' }) => {
  let text = status;
  if (status === 'loading')
    text = 'Loading ' + subject;
  if (status === 'empty')
    text = 'No ' + subject + ' found';
  if (status === 'error')
    text = 'Error loading ' + subject;

  return (
    <div className={'alert ' + className} data-error={status === 'error'}>
      {status === 'loading' && <Loading />}
      {status !== 'loading' && <AlertIcon />}
      <span>{text}</span>
    </div>
  );
};

Alert.propTypes = {
  status: PropTypes.string.isRequired,
  subject: PropTypes.string.isRequired,
  className: PropTypes.string
};

export default Alert;
