import React from 'react';

import './details.css';

const Details = ({ details }) => (
  <section>
    {Object.keys(details).map((key) => (
      <div key={key} className='model_detail_row'>
        <span className='text_small semibold'>{key}</span>
        <span>{details[key]}</span>
      </div>
    ))}
  </section>
);

export default Details;
