import React from 'react';
import Linkify from 'react-linkify';

import './details.css';

const Details = ({ details }) => (
  <section>
    {Object.keys(details)
      .filter(filter)
      .map((key) => (
        <div key={key} className='model_detail_row'>
          <span className='text_small semibold'>{key}</span>
          <span>
            <Linkify>{format(details[key])}</Linkify>
          </span>
        </div>
      ))}
  </section>
);

export default Details;

const format = (value) => {
  const type = typeof value;
  if (type === 'string' || (type === 'number' && !Number.isNaN(value))) {
    value = String(value);
    value = value
      .split('\n')
      .map((line, index) => <div key={index}>{line}</div>);
  } else
    value = '-';

  return value;
};

const filter = (key) => {
  return key !== 'selected';
};
