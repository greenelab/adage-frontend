import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import './index.css';

const LinkTextIcon = ({ to, text, icon, className, ...props }) => (
  <Link className={'link_text_icon ' + (className || '')} to={to} {...props}>
    <span>{text}</span>
    {icon}
  </Link>
);

LinkTextIcon.propTypes = {
  to: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  icon: PropTypes.element.isRequired
};

export default LinkTextIcon;
