import React from 'react';

import Header from '../header';
import Main from '../main';
import Footer from '../footer';
import Section from '../../components/section';
import Search from './search';
import { humanizeObject } from '../../util/object';
import { flattenObject } from '../../util/object';

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

export const mapSample = (sample) => humanizeObject(flattenObject(sample));
