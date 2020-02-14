import React from 'react';
import PropTypes from 'prop-types';

import Clickable from '../../../../components/clickable';

import { ReactComponent as RadioedIcon } from '../../../../images/radioed.svg';
import { ReactComponent as UnradioedIcon } from '../../../../images/unradioed.svg';
import { ReactComponent as InfoIcon } from '../../../../images/info.svg';

import './index.css';

// entry row in model select list

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
    <Clickable
      icon={selected ? <RadioedIcon /> : <UnradioedIcon />}
      button
      aria-label='Select this model'
      onClick={onClick}
    />
    <div className='model_summary'>
      <span className='nowrap medium'>{title}</span>
      <span className='nowrap text_small'>
        {authors[0]}, et al · {journal} · {year}
      </span>
    </div>
    <Clickable
      to={'/model/' + id}
      newTab
      icon={<InfoIcon />}
      button
      aria-label={'Open details page for model ' + title}
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
