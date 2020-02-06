import React from 'react';

import { ReactComponent as GreeneLabLogo } from '../../images/greene-lab-logo.svg';

import './index.css';

// footer page component

const Footer = () => (
  <footer>
    <GreeneLabLogo />
    <span>
      Project of the <a href='https://greenelab.com/'>Greene Lab</a>
    </span>
  </footer>
);

export default Footer;
