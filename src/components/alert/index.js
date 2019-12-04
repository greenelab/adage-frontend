import React from 'react';
import PropTypes from 'prop-types';

import { ReactComponent as AlertIcon } from '../../images/alert.svg';
import { ReactComponent as Loading } from '../../images/loading.svg';

import './index.css';

const Alert = ({ text = '', className = '', loading, error }) => (
  <div className={'alert ' + className} data-error={error}>
    {loading && <Loading />}
    {!loading && <AlertIcon />}
    <span>{text}</span>
  </div>
);

Alert.propTypes = {
  text: PropTypes.string.isRequired
};

export default Alert;
