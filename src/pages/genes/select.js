import React from 'react';

import Input from '../../components/input';

import './select.css';

const Select = () => {
  return (
    <section>
      <Input
        multi
        placeholder='search for a gene'
        multiPlaceholder='search for a list of genes'
        onChange={console.log}
        onChangeExpanded={console.log}
      />
    </section>
  );
};

export default Select;
