import React from 'react';

import Clickable from '../../components/clickable';

// link to experiment details page

const ExperimentLink = ({ experiment = {} }) => {
  const { id, accession } = experiment;
  const label = accession || id || '-';

  return (
    <Clickable
      to={'/experiment/' + id}
      text={label}
      link
      aria-label={'Open details page for experiment ' + label}
    />
  );
};

export default ExperimentLink;
