import React from 'react';

import { ReactComponent as AdageLogo } from '../../../images/logo.svg';

import './index.css';

import packageJson from '../../../../package.json';

// big header with logo on home page

const Header = () => (
  <header className='home_header' title={packageJson.version}>
    <AdageLogo />
    <span className='text_huge'>adage</span>
  </header>
);

export default Header;
