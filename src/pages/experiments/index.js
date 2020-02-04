import React from 'react';

import Header from '../header';
import Main from '../main';
import Footer from '../footer';
import Section from '../../components/section';
import Search from './search';
import { humanizeString } from '../../util/string';

import './index.css';

const Experiments = () => (
  <>
    <Header />
    <Main>
      <Section text='Experiment Search'>
        <Search />
      </Section>
      <Section text='Selected Experiment'></Section>
    </Main>
    <Footer />
  </>
);

export default Experiments;

export const mapExperiment = (experiment) => ({
  accession: experiment.accession,
  name: experiment.name,
  description: experiment.description,
  samples: (experiment.samples || []).map(mapSample)
});

export const mapSample = (sample) => {
  const annotations = { ...sample.annotations };
  for (const key of Object.keys(annotations)) {
    const newKey = humanizeString(key);
    if (key !== newKey) {
      annotations[newKey] = annotations[key];
      delete annotations[key];
    }
  }

  return {
    id: sample.id,
    name: sample.name,
    dataSource: sample.ml_data_source,
    annotations: annotations
  };
};
