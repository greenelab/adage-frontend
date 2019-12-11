import React from 'react';

import ModelSelect from '../model-select';

import Link from '../../../components/link';

import { ReactComponent as Help } from '../../../images/help.svg';

import './index.css';

const Aux = () => (
  <div className='page_header_column'>
    <ModelSelect />
    <Link to='help' newTab icon={<Help />} />
  </div>
);

export default Aux;
