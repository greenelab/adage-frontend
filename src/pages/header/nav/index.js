import React from 'react';

import Button from './button';

import { ReactComponent as Genes } from '../../../images/genes.svg';
import { ReactComponent as Experiments } from '../../../images/experiments.svg';
import { ReactComponent as Signatures } from '../../../images/signatures.svg';

import './index.css';

const Nav = () => (
  <nav className='page_header_column'>
    <Button icon={<Genes />} text='Genes' />
    <Button icon={<Experiments />} text='Experiments' />
    <Button icon={<Signatures />} text='Signatures' />
  </nav>
);

export default Nav;
