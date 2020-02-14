import React from 'react';

import Clickable from '../../components/clickable';

// link to sample details page

const SampleLink = ({ sample = {} }) => (
  <Clickable
    to={'/sample/' + sample.id}
    newTab
    text={sample.name}
    link
    aria-label={'Open details page for sample ' + sample.name}
  />
);

export default SampleLink;
