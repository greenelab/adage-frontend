import React from 'react';

import Header from '../header';
import Main from '../main';
import Footer from '../footer';
import SectionHeader from '../../components/section-header';
import Search from './search';
import Results from './results';

import './index.css';

const Genes = () => (
  <>
    <Header />
    <Main>
      <SectionHeader text='Select Genes' />
      <section>
        <Search />
        <Results />
      </section>
    </Main>
    <Footer />
  </>
);

export default Genes;
