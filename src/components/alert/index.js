import React from 'react';
import PropTypes from 'prop-types';

import { ReactComponent as AlertIcon } from '../../images/alert.svg';

import './index.css';

// general alert message with icon

const Alert = ({ text = '', className = '' }) => (
  <div className={'alert ' + className}>
    <AlertIcon />
    <span>{text}</span>
  </div>
);

Alert.propTypes = {
  text: PropTypes.string.isRequired,
  className: PropTypes.string
};

export default Alert;
