import React from 'react';
import PropTypes from 'prop-types';

import Button from '../../components/button';
import LinkIcon from '../../components/link-icon';

import { ReactComponent as Checked } from '../../images/checked.svg';
import { ReactComponent as Unchecked } from '../../images/unchecked.svg';
import { ReactComponent as Info } from '../../images/info.svg';

import './index.css';

const GeneResultSingle = ({
  onClick = () => null,
  selected = false,
  id = null,
  standardName = '-',
  systematicName = '-',
  entrezId = '-',
  description = '-'
}) => (
  <div className='gene_result_single'>
    <Button className='gene_result_single_button' onClick={onClick}>
      <div className='gene_result_single_check'>
        {selected && <Checked />}
        {!selected && <Unchecked />}
      </div>
      <div className='gene_result_single_summary'>
        <span>{standardName}</span>
        <span className='text_small'>{systematicName}</span>
        <span className='text_small'>{entrezId}</span>
        <span className='text_small'>{description}</span>
      </div>
    </Button>
    <LinkIcon to={'/gene/' + id} icon={<Info />} className='gene_info' />
  </div>
);

GeneResultSingle.propTypes = {
  onClick: PropTypes.func,
  selected: PropTypes.bool,
  id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  standardName: PropTypes.string,
  systematicName: PropTypes.string,
  entrezId: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  description: PropTypes.string
};

export default GeneResultSingle;
