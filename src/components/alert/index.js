import React from 'react';
import PropTypes from 'prop-types';

import { thunkActionStatuses } from '../../util/thunk-actions.js';

import { ReactComponent as AlertIcon } from '../../images/alert.svg';
import { ReactComponent as Loading } from '../../images/loading.svg';

import './index.css';

const Alert = ({ status = '', subject = '', className = '' }) => {
  let text = status;
  if (status === thunkActionStatuses.LOADING)
    text = 'Loading ' + subject;
  else if (status === thunkActionStatuses.EMPTY)
    text = 'No ' + subject + ' found';
  else if (status === thunkActionStatuses.ERROR)
    text = 'Error loading ' + subject;

  return (
    <div
      className={'alert ' + className}
      data-error={status === thunkActionStatuses.ERROR}
    >
      {status === thunkActionStatuses.LOADING && <Loading />}
      {status !== thunkActionStatuses.LOADING && <AlertIcon />}
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
