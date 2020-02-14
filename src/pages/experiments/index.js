import React from 'react';

import Header from '../header';
import Main from '../main';
import Footer from '../footer';
import Section from '../../components/section';
import Search from './search';
import Activities from './activities';
import Selected from './selected';
import Group from './group';

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
      <Section header='Activity Heatmap'>
        <Activities />
      </Section>
      <Section header='Sample Groups'>
        <Group />
      </Section>
    </Main>
    <Footer />
  </>
);

export default Experiments;
