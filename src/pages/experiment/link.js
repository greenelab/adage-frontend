import React from 'react';

import Clickable from '../../components/clickable';

// link to experiment details page

const ExperimentLink = ({ experiment = {} }) => (
  <Clickable
    to={'/experiment/' + experiment.accession}
    newTab
    text={experiment.accession}
    link
    aria-label={'Open details page for experiment ' + experiment.accession}
  />
);

export default ExperimentLink;
