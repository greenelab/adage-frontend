import React from 'react';

import { ReactComponent as Logo } from '../../../images/logo.svg';

import './index.css';

const Header = () => (
  <header className='home_header'>
    <Logo />
    <span className='text_huge'>adage</span>
  </header>
);

export default Header;
