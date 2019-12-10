import React from 'react';
import PropTypes from 'prop-types';

import Button from '../../../../components/button';
import LinkIcon from '../../../../components/link-icon';

import { ReactComponent as Radioed } from '../../../../images/radioed.svg';
import { ReactComponent as Unradioed } from '../../../../images/unradioed.svg';
import { ReactComponent as Info } from '../../../../images/info.svg';

import './index.css';

const Item = ({
  onClick = () => null,
  selected = false,
  id = null,
  title = 'Untitled model',
  authors = ['Unknown author'],
  journal = '-',
  year = '-'
}) => (
  <div className='model_item'>
    <Button className='model_button' onClick={onClick}>
      <div className='model_radio'>
        {selected && <Radioed />}
        {!selected && <Unradioed />}
      </div>
      <div className='model_summary'>
        <div className='semibold nowrap'>{title}</div>
        <div className='text_small nowrap'>
          {authors[0]}, et al · {journal} · {year}
        </div>
      </div>
    </Button>
    <LinkIcon
      to={'/model/' + id}
      newTab
      icon={<Info />}
      className='model_info'
    />
  </div>
);

Item.propTypes = {
  onClick: PropTypes.func,
  selected: PropTypes.bool,
  id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  title: PropTypes.string,
  authors: PropTypes.arrayOf(PropTypes.string),
  journal: PropTypes.string,
  year: PropTypes.oneOfType([PropTypes.number, PropTypes.string])
};

export default Item;
