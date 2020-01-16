import React from 'react';
import PropTypes from 'prop-types';
import { useRef } from 'react';
import { useEffect } from 'react';

import Tooltip from '../../../../components/tooltip';
import Field from '../../../../components/field';
import Button from '../../../../components/button';

import { ReactComponent as Checked } from '../../../../images/checked.svg';
import { ReactComponent as Unchecked } from '../../../../images/unchecked.svg';

import './index.css';

const SingleRow = ({
  onClick = () => null,
  id = null,
  selected = false,
  cols = [],
  highlighted = false,
  highlightedCol = -1
}) => {
  const ref = useRef(null);

  useEffect(() => {
    if (highlighted && ref.current)
      ref.current.scrollIntoView({ block: 'nearest' });
  });

  return (
    <div
      className='gene_search_result_single'
      ref={ref}
      data-shade={highlighted}
    >
      <Tooltip
        text={(selected ? 'Deselect' : 'Select') + ' this gene'}
        horizontalAlign='left'
      >
        <Button className='gene_search_result_single_button' onClick={onClick}>
          {selected && <Checked />}
          {!selected && <Unchecked />}
        </Button>
      </Tooltip>
      {cols.map((col, index) => (
        <span key={index} className='td' data-padded='true'>
          <Field className={highlightedCol === index ? 'semibold' : ''}>
            {col}
          </Field>
        </span>
      ))}
    </div>
  );
};
SingleRow.propTypes = {
  onClick: PropTypes.func,
  selected: PropTypes.bool,
  id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  cols: PropTypes.array,
  highlightedCol: PropTypes.number
};

export default SingleRow;
