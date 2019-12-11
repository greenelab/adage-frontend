import React from 'react';
import PropTypes from 'prop-types';
import { useRef } from 'react';
import { useEffect } from 'react';

import Button from '../../../../components/button';
import Link from '../../../../components/link';

import { ReactComponent as Checked } from '../../../../images/checked.svg';
import { ReactComponent as Unchecked } from '../../../../images/unchecked.svg';
import { ReactComponent as Info } from '../../../../images/info.svg';

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
      data-shaded={highlighted}
    >
      <Button
        className='gene_search_result_single_button'
        onClick={() => onClick(id, selected)}
      >
        <div className='gene_search_result_single_check'>
          {selected && <Checked />}
          {!selected && <Unchecked />}
        </div>
        <div className='gene_search_result_single_summary'>
          {cols.map((col, index) => (
            <span
              key={index}
              className={`
                field
                text_small
                nowrap
              `}
              data-highlighted={highlightedCol === index}
            >
              {col}
            </span>
          ))}
        </div>
      </Button>
      <Link
        to={'/gene/' + id}
        newTab
        icon={<Info />}
      />
    </div>
  );
};
SingleRow.propTypes = {
  onClick: PropTypes.func,
  selected: PropTypes.bool,
  id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  cols: PropTypes.arrayOf(
    PropTypes.oneOfType([PropTypes.number, PropTypes.string])
  ),
  highlightedCol: PropTypes.number
};

export default SingleRow;
