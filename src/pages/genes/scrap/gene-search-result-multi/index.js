import React from 'react';
import PropTypes from 'prop-types';

import Button from '../../components/button';

import { ReactComponent as Checked } from '../../images/checked.svg';
import { ReactComponent as Unchecked } from '../../images/unchecked.svg';

import './index.css';

const GeneResultMulti = ({
  onClick = () => null,
  search = '-',
  result1 = {},
  result2 = {},
  result3 = {}
}) => (
  <div className='gene_result_multi'>
    <div className='gene_result_multi_search'>{search}</div>
  </div>
);

GeneResultMulti.propTypes = {
  onClick: PropTypes.func,
  search: PropTypes.string,
  result1: PropTypes.object,
  result2: PropTypes.object,
  result2: PropTypes.object
};

export default GeneResultMulti;
