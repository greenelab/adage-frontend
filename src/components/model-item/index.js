import React from 'react';

import LinkIcon from '../../components/link-icon';

import { ReactComponent as Unchecked } from '../../images/unchecked.svg';
import { ReactComponent as Info } from '../../images/info.svg';

import './index.css';

const ModelItem = ({
  title = 'Title',
  author = 'author',
  publisher = 'publisher',
  year = 'year'
}) => (
  <div className='model_item'>
    <button className='model_button'>
      <div className='model_radio'>
        <Unchecked />
      </div>
      <div className='model_summary'>
        <div className='semibold'>{title}</div>
        <div className='text_small'>
          {author} · {publisher} · {year}
        </div>
      </div>
    </button>
    <LinkIcon to='/models' icon={<Info />} className='model_info' />
  </div>
);

export default ModelItem;
