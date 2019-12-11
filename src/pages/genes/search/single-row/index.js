import React from 'react';
import PropTypes from 'prop-types';
import { useRef } from 'react';
import { useEffect } from 'react';

import Button from '../../../../components/button';
import LinkIcon from '../../../../components/link-icon';

import { ReactComponent as Checked } from '../../../../images/checked.svg';
import { ReactComponent as Unchecked } from '../../../../images/unchecked.svg';
import { ReactComponent as Info } from '../../../../images/info.svg';

import './index.css';

const SingleRow = ({
  onClick = () => null,
  id = null,
  selected = false,
  cols = [],
  highlightedCol = -1,
  outlined = false
}) => {
  const ref = useRef(null);

  useEffect(() => {
    if (outlined && ref.current)
      ref.current.scrollIntoView({ block: 'nearest' });
  });

  return (
    <div
      className='gene_search_result_single'
      ref={ref}
      data-outlined={outlined}
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
      <LinkIcon
        to={'/gene/' + id}
        newTab
        icon={<Info />}
        className='gene_search_result_single_info'
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