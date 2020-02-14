import React from 'react';

import Link from '../../../components/link';

import { ReactComponent as AdageLogo } from '../../../images/logo-small.svg';

import './index.css';

import packageJson from '../../../../package.json';

// logo and link to home page

const Title = () => (
  <Link
    to='/'
    className='page_header_column'
    icon={<AdageLogo className='logo_small' />}
    text={<span className='title_text text_large'>adage</span>}
    title={packageJson.version}
    flip
    button={false}
  />
);

export default Title;
