import React from 'react';

import Header from '../header';
import Main from '../main';
import Footer from '../footer';
import SectionHeader from '../../components/section-header';
import Details from './details.js';

import './index.css';

const Model = () => (
  <>
    <Header justTitle />
    <Main>
      <SectionHeader text='Model Details' />
      <Details  />
    </Main>
    <Footer />
  </>
);

export default Model;
