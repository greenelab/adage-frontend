import React from 'react';

import { ReactComponent as Logo } from '../../../images/logo.svg';

import './index.css';

import packageJson from '../../../../package.json';

const Header = () => (
  <header className='home_header' title={packageJson.version}>
    <Logo />
    <span className='text_huge'>adage</span>
  </header>
);

export default Header;
