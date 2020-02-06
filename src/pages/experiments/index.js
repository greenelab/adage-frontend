import React from 'react';

import Header from '../header';
import Main from '../main';
import Footer from '../footer';
import Section from '../../components/section';
import Search from './search';
import Selected from './selected';
import { normalize } from '../../util/object';

import './index.css';

// experiments page

const Experiments = () => (
  <>
    <Header />
    <Main>
      <Section header='Experiment Search'>
        <Search />
      </Section>
      <Section header='Selected Experiment'>
        <Selected />
      </Section>
    </Main>
    <Footer />
  </>
);

export default Experiments;

export const mapExperiment = (experiment) => normalize(experiment);

export const mapExperimentDownload = (experiment) => normalize(experiment, true);
