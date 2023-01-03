import React from 'react';

import Clickable from '../../../components/clickable';

import { ReactComponent as Logo } from '../../../images/logo.svg';

import './index.css';

import packageJson from '../../../../package.json';

// logo and link to home page

const Title = () => (
  <Clickable
    to='/'
    className='page_header_column'
    icon={<Logo className='logo_small' />}
    text={
      <span className='title_text size_large'>
        {process.env.REACT_APP_TITLE}
      </span>
    }
    title={packageJson.version}
    flip
  />
);

export default Title;
