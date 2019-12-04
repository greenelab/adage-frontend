import React from 'react';
import { connect } from 'react-redux';

import Header from '../header';
import Main from '../main';
import Footer from '../footer';
import SectionHeader from '../../components/section-header';
import Search from './search';
import SingleResults from './single-results';
import MultiResults from './multi-results';

import './index.css';

let Genes = ({ multi }) => (
  <>
    <Header />
    <Main>
      <SectionHeader text='Select Genes' />
      <section>
        <Search />
        {!multi && <SingleResults />}
        {multi && <MultiResults />}
      </section>
    </Main>
    <Footer />
  </>
);

const selector = (state) => ({
  multi: state.gene.searches.length > 1
});

Genes = connect(selector)(Genes);

export default Genes;
