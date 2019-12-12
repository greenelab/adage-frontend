import React from 'react';
import PropTypes from 'prop-types';
import Linkify from 'react-linkify';

import Field from '../../components/field';
import HorizontalLine from '../../components/horizontal-line';

import './index.css';

const Details = ({ data = {} }) => {
  if (typeof data !== 'object' || data === null || !Object.keys(data).length)
    return <></>;

  return (
    <>
      {Object.keys(data).map((key, index, array) => (
        <React.Fragment key={index}>
          <div className='detail_row'>
            <Field className='text_small medium'>{key}</Field>
            <span className='text_small'>
              <Linkify>{format(data[key])}</Linkify>
            </span>
          </div>
          {index < array.length - 1 && <HorizontalLine />}
        </React.Fragment>
      ))}
    </>
  );
};

Details.propTypes = {
  data: PropTypes.any
};

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
