import React from 'react';

import Header from '../header';
import Main from '../main';
import Footer from '../footer';
import Section from '../../components/section';
import Search from './search';
import Selected from './selected';
import { clean } from '../../util/object';

import './index.css';

const Experiments = () => (
  <>
    <Header />
    <Main>
      <Section text='Experiment Search'>
        <Search />
      </Section>
      <Section text='Selected Experiment'>
        <Selected />
      </Section>
    </Main>
    <Footer />
  </>
);

export default Experiments;

export const mapExperiment = (experiment) => clean(experiment);

export const mapExperimentDownload = (experiment) => clean(experiment, true);
