import React from 'react';

import Title from './title';
import Nav from './nav';
import Right from './right';

import './index.css';

// header page component

const Header = () => (
  <header className='page_header'>
    <Title />
    <Nav />
    <Right />
  </header>
);

export default Header;
