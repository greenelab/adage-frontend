import React from 'react';

import Clickable from '../../components/clickable';

// link to gene details page

const GeneLink = ({ gene = {}, extraTooltip = '' }) => {
  const { id, standardName } = gene;
  const label = standardName || id || '-';

  return (
    <Clickable
      to={gene.externalUrl || '/gene/' + id}
      text={label}
      link
      aria-label={
        'Open details page for gene ' +
        label +
        (extraTooltip ? ' (' + extraTooltip + ')' : '')
      }
    />
  );
};

export default GeneLink;
