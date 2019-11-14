import React from 'react';
import { Link } from 'react-router-dom';

import { ReactComponent as Logo } from '../../../images/logo-small.svg';

import './index.css';

const Title = () => (
  <Link to='/'>
    <div className='header_column'>
      <Logo className='logo_small' />
      <h2>adage</h2>
    </div>
  </Link>
);

export default Title;
