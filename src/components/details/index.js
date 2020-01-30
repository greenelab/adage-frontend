import React from 'react';
import { Fragment } from 'react';
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
        <Fragment key={index}>
          <div className='detail_row'>
            <Field className='medium'>{key}</Field>
            <span>
              <Linkify>{format(data[key])}</Linkify>
            </span>
          </div>
          {index < array.length - 1 && <HorizontalLine />}
        </Fragment>
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
