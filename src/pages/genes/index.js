import React from 'react';

import Header from '../header';
import Main from '../main';
import Footer from '../footer';
import SectionHeader from '../../components/section-header';
import Select from './select.js';

import './index.css';

const Genes = () => (
  <>
    <Header />
    <Main>
      <SectionHeader text='Select Genes' />
      <Select />
    </Main>
    <Footer />
  </>
);

export default Genes;
