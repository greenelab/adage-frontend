import React from 'react';

import Clickable from '../../components/clickable';

// link to gene details page

const GeneLink = ({ gene = {}, extraTooltip = '' }) => (
  <Clickable
    to={gene.externalUrl || '/gene/' + gene.id}
    text={gene.standardName}
    link
    aria-label={
      'Open details page for gene ' +
      gene.standardName +
      (extraTooltip ? ' (' + extraTooltip + ')' : '')
    }
  />
);

export default GeneLink;
