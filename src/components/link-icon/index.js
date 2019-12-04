import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import './index.css';

const LinkIcon = ({ to, newTab, icon = <></>, className = '', ...props }) => (
  <Link
    className={'link_icon ' + className}
    // target={newTab ? '_blank' : undefined}
    to={to}
    {...props}
  >
    {icon}
  </Link>
);

LinkIcon.propTypes = {
  to: PropTypes.string.isRequired,
  icon: PropTypes.element.isRequired,
  className: PropTypes.string
};

export default LinkIcon;
