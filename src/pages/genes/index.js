import React from 'react';

import Header from '../header';
import Main from '../main';
import Footer from '../footer';
import Section from '../../components/section';
import Search from './search';
import Selected from './selected';
import Enriched from './enriched';
import Network from './network';

import './index.css';

// genes page

const Genes = () => (
  <>
    <Header />
    <Main>
      <Section header='Gene Search'>
        <Search />
      </Section>
      <Section header='Selected Genes'>
        <Selected />
      </Section>
      <Section header='Enriched Signatures'>
        <Enriched />
      </Section>
      <Section header='Gene Network'>
        <Network />
      </Section>
    </Main>
    <Footer />
  </>
);

export default Genes;
