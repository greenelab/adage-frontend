import React from 'react';
import PropTypes from 'prop-types';

import { actionStatuses } from '../../actions/fetch';

import { ReactComponent as AlertIcon } from '../../images/alert.svg';
import { ReactComponent as LoadingIcon } from '../../images/loading.svg';

import './index.css';

// takes fetch action statuses and displays appropriate message and icon

const FetchAlert = ({ status = '', subject = '', className = '' }) => {
  let text = status;
  if (status === actionStatuses.LOADING)
    text = 'Loading ' + subject;
  else if (status === actionStatuses.EMPTY)
    text = 'No ' + subject + ' found';
  else if (status === actionStatuses.ERROR)
    text = 'Error loading ' + subject;

  return (
    <div
      className={'alert ' + className}
      data-error={status === actionStatuses.ERROR}
    >
      {status === actionStatuses.LOADING && <LoadingIcon />}
      {status !== actionStatuses.LOADING && <AlertIcon />}
      <span>{text}</span>
    </div>
  );
};

FetchAlert.propTypes = {
  status: PropTypes.string.isRequired,
  subject: PropTypes.string.isRequired,
  className: PropTypes.string
};

export default FetchAlert;
