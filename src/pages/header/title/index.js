import React from 'react';
import { Link } from 'react-router-dom';

import { ReactComponent as AdageLogo } from '../../../images/logo-small.svg';

import './index.css';

import packageJson from '../../../../package.json';

// logo and link to home page

const Title = () => (
  <Link to='/' className='page_header_column' title={packageJson.version}>
    <AdageLogo className='logo_small' />
    <span className='text_large'>adage</span>
  </Link>
);

export default Title;
