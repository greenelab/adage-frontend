import React from 'react';
import PropTypes from 'prop-types';

import Button from '../../../../components/button';
import Link from '../../../../components/link';

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
    <Button className='model_button' onClick={onClick}>
      <div className='model_radio' aria-label='Select this model'>
        {selected && <RadioedIcon />}
        {!selected && <UnradioedIcon />}
      </div>
      <div className='model_summary'>
        <span className='nowrap medium'>{title}</span>
        <span className='nowrap text_small'>
          {authors[0]}, et al · {journal} · {year}
        </span>
      </div>
    </Button>
    <Link
      to={'/model/' + id}
      newTab
      icon={<InfoIcon />}
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
