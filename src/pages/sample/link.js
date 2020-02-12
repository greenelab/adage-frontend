import React from 'react';

import Link from '../../components/link';

// link to sample details page

const SampleLink = ({ sample = {} }) => (
  <Link
    to={'/sample/' + sample.id}
    newTab
    button={false}
    text={sample.name}
    aria-label={'Open details page for sample ' + sample.name}
  />
);

export default SampleLink;
