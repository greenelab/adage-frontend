import React from 'react';

import Input from '../../../../components/input';
import NumberBox from '../../../../components/number-box';

import './index.css';

// filter controls above gene network graph

const Filters = ({ setSearch, setPValueCutoff }) => (
  <div id='volcano_filters'>
    <div>
      <Input
        className='volcano_search'
        placeholder='search signatures'
        onChange={setSearch}
      />
    </div>
    <div>
      <span className='volcano_cutoff_label'>p value</span>
      <span>&lt;</span>
      <NumberBox
        className='volcano_cutoff'
        defaultValue={1}
        onChange={setPValueCutoff}
      />
    </div>
  </div>
);

export default Filters;
