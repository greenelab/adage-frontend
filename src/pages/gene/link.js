import React from 'react';

import Clickable from '../../components/clickable';

// link to gene details page

const GeneLink = ({ gene = {} }) => (
  <Clickable
    to={
      'http://www.pseudomonas.com/feature/show/?locus_tag=' +
      gene.systematicName
    }
    newTab
    text={gene.standardName}
    link
    aria-label={'Open details page for gene ' + gene.standardName}
  />
);

export default GeneLink;
