import React from 'react';

import ModelSelect from '../model-select';

import Tooltip from '../../../components/tooltip';
import Link from '../../../components/link';

import { ReactComponent as Help } from '../../../images/help.svg';

import './index.css';

const Aux = () => (
  <div className='page_header_column'>
    <ModelSelect />
    <Tooltip
      text='View help documentation for this page'
      horizontalAlign='right'
      verticalAlign='bottom'
    >
      <Link to='help' newTab icon={<Help />} />
    </Tooltip>
  </div>
);

export default Aux;
