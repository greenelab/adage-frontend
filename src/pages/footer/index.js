import React from 'react';

import { ReactComponent as GreeneLabLogo } from '../../images/greene-lab-logo.svg';

import './index.css';

// footer page component

const Footer = () => (
  <footer>
    <a href='https://greenelab.com/'>
      <GreeneLabLogo />
    </a>
    <span>
      Project of the <a href='https://greenelab.com/'>Greene Lab</a> and the{' '}
      <a href='https://sites.dartmouth.edu/hoganlab/'>Hogan Lab</a>
    </span>
  </footer>
);

export default Footer;
