import React from 'react';
import PropTypes from 'prop-types';

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
  col1 = '-',
  col2 = '-',
  col3 = '-',
  col4 = '-'
}) => (
  <div className='gene_search_result_single'>
    <Button
      className='gene_search_result_single_button'
      onClick={() => onClick(id, selected)}
    >
      <div className='gene_search_result_single_check'>
        {selected && <Checked />}
        {!selected && <Unchecked />}
      </div>
      <div className='gene_search_result_single_summary'>
        <span
          className={`
            gene_search_result_field
            text_small
            nowrap
          `}
        >
          {col1}
        </span>
        <span
          className={`
            gene_search_result_field
            text_small
            nowrap
          `}
        >
          {col2}
        </span>
        <span
          className={`
            gene_search_result_field
            text_small
            nowrap
          `}
        >
          {col3}
        </span>
        <span
          className={`
            gene_search_result_field
            text_small
            nowrap
          `}
        >
          {col4}
        </span>
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

SingleRow.propTypes = {
  onClick: PropTypes.func,
  selected: PropTypes.bool,
  id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  col1: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  col2: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  col3: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  col4: PropTypes.oneOfType([PropTypes.number, PropTypes.string])
};

export default SingleRow;
