import React from 'react';
import { Link } from 'react-router-dom';

import { ReactComponent as Logo } from '../../../images/logo-small.svg';

import './index.css';

const Title = () => (
  <Link to='/'>
    <div className='page_header_column'>
      <Logo className='logo_small' />
      <span className='text_large'>adage</span>
    </div>
  </Link>
);

export default Title;
