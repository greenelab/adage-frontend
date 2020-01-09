import React from 'react';
import PropTypes from 'prop-types';

import { actionStatuses } from '../../actions/fetch.js';
import Field from '../../components/field';

import { ReactComponent as Alert } from '../../images/alert.svg';
import { ReactComponent as Loading } from '../../images/loading.svg';

import './index.css';

const FetchAlert = ({
  status = '',
  subject = '',
  loadingText = '',
  emptyText = '',
  errorText = '',
  className = ''
}) => {
  let text = status;
  if (status === actionStatuses.LOADING)
    text = loadingText || 'Loading ' + subject;
  else if (status === actionStatuses.EMPTY)
    text = emptyText || 'No ' + subject + ' found';
  else if (status === actionStatuses.ERROR)
    text = errorText || 'Error loading ' + subject;

  return (
    <div
      className={'alert ' + className}
      data-error={status === actionStatuses.ERROR}
    >
      {status === actionStatuses.LOADING && <Loading />}
      {status !== actionStatuses.LOADING && <Alert />}
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
