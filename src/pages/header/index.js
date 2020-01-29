import React from 'react';

import Title from './title';
import Nav from './nav';
import Right from './right';

import './index.css';

const Header = ({ justTitle }) => (
  <header className='page_header'>
    <Title />
    {!justTitle && (
      <>
        <Nav />
        <Right />
      </>
    )}
  </header>
);

export default Header;
