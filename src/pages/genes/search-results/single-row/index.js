import React from 'react';
import PropTypes from 'prop-types';

import Button from '../../../../components/button';
import LinkIcon from '../../../../components/link-icon';
import { firstBefore } from '../../../../util/dom.js';
import { firstAfter } from '../../../../util/dom.js';

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
  ...props
}) => {
  const onKeyDown = (event) => {
    event = event.nativeEvent;
    switch (event.key) {
      case 'Escape':
        const input = document.querySelector('input');
        if (input)
          input.focus();
        break;

      case 'ArrowUp':
        const previous = firstBefore(
          event.target,
          '.gene_search_result_single_button'
        );
        if (previous) {
          previous.focus();
          event.preventDefault();
        }

        break;

      case 'ArrowDown':
        const next = firstAfter(
          event.target,
          '.gene_search_result_single_button'
        );
        if (next) {
          next.focus();
          event.preventDefault();
        }
        break;

      default:
        break;
    }
  };

  return (
    <div className='gene_search_result_single' {...props}>
      <Button
        className='gene_search_result_single_button'
        onClick={() => onClick(id, selected)}
        onKeyDown={onKeyDown}
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
              gene_search_result_field
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
