import React from 'react';

import Clickable from '../../../components/clickable';

import { ReactComponent as AdageLogo } from '../../../images/logo-small.svg';

import './index.css';

import packageJson from '../../../../package.json';

// logo and link to home page

const Title = () => (
  <Clickable
    to='/'
    className='page_header_column'
    icon={<AdageLogo className='logo_small' />}
    text={<span className='title_text size_large'>adage</span>}
    title={packageJson.version}
    flip
  />
);

export default Title;
