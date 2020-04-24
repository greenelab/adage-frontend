import React from 'react';

import Clickable from '../../components/clickable';

// link to organism details page

const OrganismLink = ({ organism = {} }) => {
  const { id, commonName } = organism;
  const label = commonName || id || '-';

  return (
    <Clickable
      to={'/organism/' + id}
      text={label}
      link
      aria-label={'Open details page for organism ' + label}
    />
  );
};

export default OrganismLink;
