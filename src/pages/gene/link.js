import React from 'react';

import Link from '../../components/link';

// link to gene details page

const GeneLink = ({ gene = {} }) => (
  <Link
    to={
      'http://www.pseudomonas.com/feature/show/?locus_tag=' +
      gene.systematicName
    }
    newTab
    button={false}
    text={gene.standardName}
    aria-label={'Open details page for gene ' + gene.standardName}
  />
);

export default GeneLink;
