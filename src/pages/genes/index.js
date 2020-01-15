import React from 'react';

import Header from '../header';
import Main from '../main';
import Footer from '../footer';
import SectionHeader from '../../components/section-header';
import Search from './search';
import Selected from './selected';
import Enriched from './enriched';

import './index.css';

const Genes = () => (
  <>
    <Header />
    <Main>
      <SectionHeader text='Search Genes' />
      <section>
        <Search />
      </section>
      <SectionHeader text='Selected Genes' />
      <section>
        <Selected />
      </section>
      {/* <SectionHeader text='Enriched Signatures' /> */}
      <section>
        {/* <Enriched /> */}
      </section>
    </Main>
    <Footer />
  </>
);

export default Genes;
