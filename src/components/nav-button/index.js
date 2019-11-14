import React from 'react';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router-dom';

import './index.css';

let NavButton = ({ location, icon, text }) => (
  <Link
    className='nav_button'
    to={'/' + text.toLowerCase()}
    data-active={location.pathname === '/' + text.toLowerCase()}
  >
    {icon}
    {text}
  </Link>
);
NavButton = withRouter(NavButton);

export default NavButton;
