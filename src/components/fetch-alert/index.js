import React from 'react';
import PropTypes from 'prop-types';

import { fetchActionStatuses } from '../../actions/fetch.js';
import Field from '../../components/field';

import { ReactComponent as Alert } from '../../images/alert.svg';
import { ReactComponent as Loading } from '../../images/loading.svg';

import './index.css';

const FetchAlert = ({ status = '', subject = '', className = '' }) => {
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
      {status !== fetchActionStatuses.LOADING && <Alert />}
      <Field>{text}</Field>
    </div>
  );
};

FetchAlert.propTypes = {
  status: PropTypes.string.isRequired,
  subject: PropTypes.string.isRequired,
  className: PropTypes.string
};

export default FetchAlert;
