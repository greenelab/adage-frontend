import React from 'react';

import NavButton from '../../../components/nav-button';

import { ReactComponent as Genes } from '../../../images/genes.svg';
import { ReactComponent as Experiments } from '../../../images/experiments.svg';
import { ReactComponent as Signatures } from '../../../images/signatures.svg';

import './index.css';

const Nav = () => (
  <nav className='page_header_column'>
    <NavButton icon={<Genes />} text='Genes' />
    <NavButton icon={<Experiments />} text='Experiments' />
    <NavButton icon={<Signatures />} text='Signatures' />
  </nav>
);

export default Nav;
