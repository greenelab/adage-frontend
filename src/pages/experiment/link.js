import React from 'react';

import Clickable from '../../components/clickable';

// link to experiment details page

const ExperimentLink = ({ experiment = {} }) => (
  <Clickable
    to={'/experiment/' + (experiment.accession || experiment)}
    newTab
    text={experiment.accession || experiment}
    link
    aria-label={
      'Open details page for experiment ' + (experiment.accession || experiment)
    }
  />
);

export default ExperimentLink;
