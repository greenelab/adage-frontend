import React from 'react';

import Button from './button';

import { ReactComponent as GeneIcon } from '../../../images/gene.svg';
import { ReactComponent as ExperimentIcon } from '../../../images/experiment.svg';
import { ReactComponent as SignatureIcon } from '../../../images/signature.svg';

import './index.css';

const Nav = () => (
  <nav className='page_header_column'>
    <Button icon={<GeneIcon />} text='Genes' />
    <Button icon={<ExperimentIcon />} text='Experiments' />
    <Button icon={<SignatureIcon />} text='Signatures' />
  </nav>
);

export default Nav;
