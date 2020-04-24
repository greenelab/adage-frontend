import React from 'react';

import Clickable from '../../components/clickable';

// link to organism details page

const OrganismLink = ({ organism = {} }) => (
  <Clickable
    to={'/organism/' + organism}
    text={organism}
    link
    aria-label={'Open details page for organism ' + organism}
  />
);

export default OrganismLink;
