import React from 'react';

import Link from '../../components/link';

// link to experiment details page

const ExperimentLink = ({ experiment = {} }) => (
  <Link
    to={'/experiment/' + (experiment.accession || experiment)}
    newTab
    button={false}
    text={experiment.accession || experiment}
    aria-label={
      'Open details page for experiment ' + (experiment.accession || experiment)
    }
  />
);

export default ExperimentLink;
