import React from 'react';

import Clickable from '../../components/clickable';

// link to experiment details page or experiments page with selected experiment

const ExperimentLink = ({ experiment = {}, detailsPage = true }) => {
  const { id, accession } = experiment;
  const label = accession || id || '-';

  return (
    <Clickable
      to={detailsPage ? '/experiment/' + id : '/experiments'}
      search={detailsPage ? undefined : { experiment: id }}
      text={label}
      link
      aria-label={
        (detailsPage ?
          'Open details page for experiment ' :
          'Go to experiments page and select experiment ') + label
      }
    />
  );
};

export default ExperimentLink;
