import React from 'react';

import ModelSelect from '../model-select';

import LinkIcon from '../../../components/link-icon';

import { ReactComponent as Help } from '../../../images/help.svg';

import './index.css';

const Aux = () => (
  <div className='page_header_column'>
    <ModelSelect />
    <LinkIcon to='help' icon={<Help />} />
  </div>
);

export default Aux;
