import React from 'react';

import Header from '../header';
import Main from '../main';
import Footer from '../footer';
import SectionHeader from '../../components/section-header';
import Search from './search';

import placeholder from '../../images/placeholder.png';

import './index.css';

const Genes = () => (
  <>
    <Header />
    <Main>
      <SectionHeader text='Search Genes' />
      <section>
        <Search />
      </section>
      <section>
        <img
          src={placeholder}
          title='placeholder screenshot'
          alt='placeholder'
        />
      </section>
    </Main>
    <Footer />
  </>
);

export default Genes;
