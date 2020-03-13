import React from 'react';

import Header from '../header';
import Main from '../main';
import Footer from '../footer';
import Section from '../../components/section';
import Search from './search';
import Selected from './selected';

import './index.css';

// signatures page

const Signatures = () => (
  <>
    <Header />
    <Main>
      <Section header="Signature Search">
        <Search />
      </Section>
      <Section header="Selected Signature">
        <Selected />
      </Section>
    </Main>
    <Footer />
  </>
);

export default Signatures;
