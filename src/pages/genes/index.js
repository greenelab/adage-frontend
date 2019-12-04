import React from 'react';

import Header from '../header';
import Main from '../main';
import Footer from '../footer';
import SectionHeader from '../../components/section-header';
import SearchBox from './search-box';
import SearchResults from './search-results';

import './index.css';

const Genes = () => (
  <>
    <Header />
    <Main>
      <SectionHeader text='Search Genes' />
      <section>
        <SearchBox />
        <SearchResults />
      </section>
    </Main>
    <Footer />
  </>
);

export default Genes;
