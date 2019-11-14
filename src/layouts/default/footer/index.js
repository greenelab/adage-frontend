import React from 'react';

import { ReactComponent as GreeneLab } from '../../../images/greene-lab-logo.svg';

import './index.css';

const Footer = () => (
  <footer className="footer_default">
    <GreeneLab />
    <h5>
      Project of the <a href='https://greenelab.com/'>Greene Lab</a>
    </h5>
  </footer>
);

export default Footer;
