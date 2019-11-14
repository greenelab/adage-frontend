import React from 'react';

import { ReactComponent as Logo } from '../../../images/logo.svg';

import './index.css';

const Header = () => (
  <header className='header_home'>
    <Logo />
    <h1>adage</h1>
  </header>
);

export default Header;
