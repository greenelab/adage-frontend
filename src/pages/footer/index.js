import React from 'react';

import { ReactComponent as GreeneLab } from '../../images/greene-lab-logo.svg';

import './index.css';

const Footer = () => (
  <footer>
    <GreeneLab />
    <span className='text_small'>
      Project of the <a href='https://greenelab.com/'>Greene Lab</a>
    </span>
  </footer>
);

export default Footer;
