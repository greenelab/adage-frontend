import React from 'react';

import Clickable from '../../components/clickable';

// link to gene details page

const GeneLink = ({ gene = {} }) => (
  <Clickable
    to={gene.externalUrl || '/gene/' + gene.id}
    newTab
    text={gene.standardName}
    link
    aria-label={'Open details page for gene ' + gene.standardName}
  />
);

export default GeneLink;
