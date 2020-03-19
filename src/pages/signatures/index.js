import React from 'react';

import Header from '../header';
import Main from '../main';
import Footer from '../footer';
import Section from '../../components/section';
import Search from './search';
import Participating from './participating';

import './index.css';

// signatures page

const Signatures = () => (
  <>
    <Header />
    <Main>
      <Section header="Signature Search">
        <Search />
      </Section>
      <Section header="Participating Genes">
        <Participating />
      </Section>
    </Main>
    <Footer />
  </>
);

export default Signatures;
