import React from 'react';

import Clickable from '../../components/clickable';

// link to sample details page

const SampleLink = ({ sample = {} }) => {
  const { id, name } = sample;
  const label = name || id || '-';

  return (
    <Clickable
      to={'/sample/' + id}
      text={label}
      link
      aria-label={'Open details page for sample ' + label}
    />
  );
};

export default SampleLink;
