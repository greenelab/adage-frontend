import React from 'react';
import PropTypes from 'prop-types';

import Field from '../../components/field';

import { ReactComponent as AlertIcon } from '../../images/alert.svg';

import './index.css';

const Alert = ({ text = '', className = '' }) => (
  <div className={'alert ' + className}>
    <AlertIcon />
    <Field>{text}</Field>
  </div>
);

Alert.propTypes = {
  text: PropTypes.string.isRequired,
  className: PropTypes.string
};

export default Alert;
