import React from 'react';
import PropTypes from 'prop-types';

import { fetchActionStatuses } from '../../actions/fetch.js';

import { ReactComponent as AlertIcon } from '../../images/alert.svg';
import { ReactComponent as Loading } from '../../images/loading.svg';

import './index.css';

const Alert = ({ status = '', subject = '', className = '' }) => {
  let text = status;
  if (status === fetchActionStatuses.LOADING)
    text = 'Loading ' + subject;
  else if (status === fetchActionStatuses.EMPTY)
    text = 'No ' + subject + ' found';
  else if (status === fetchActionStatuses.ERROR)
    text = 'Error loading ' + subject;

  return (
    <div
      className={'alert ' + className}
      data-error={status === fetchActionStatuses.ERROR}
    >
      {status === fetchActionStatuses.LOADING && <Loading />}
      {status !== fetchActionStatuses.LOADING && <AlertIcon />}
      <span className='nowrap'>{text}</span>
    </div>
  );
};

Alert.propTypes = {
  status: PropTypes.string.isRequired,
  subject: PropTypes.string.isRequired,
  className: PropTypes.string
};

export default Alert;
