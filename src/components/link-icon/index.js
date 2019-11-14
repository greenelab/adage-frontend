import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import './index.css';

const LinkIcon = ({ to, icon, className, ...props }) => (
  <Link className={'link_icon ' + (className || '')} to={to} {...props}>
    {icon}
  </Link>
);

LinkIcon.propTypes = {
  to: PropTypes.string.isRequired,
  icon: PropTypes.element.isRequired
};

export default LinkIcon;
