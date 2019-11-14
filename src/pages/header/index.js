import React from 'react';

import Title from './title';
import Nav from './nav';
import Aux from './aux';

import './index.css';

const Header = () => (
  <header className='header_default'>
    <Title />
    <Nav />
    <Aux />
  </header>
);

export default Header;
