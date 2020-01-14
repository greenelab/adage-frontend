import React from 'react';

import Main from '../main';
import Header from './header';
import Banner from './banner';
import Feature from './feature';
import Footer from '../footer';
import HorizontalLine from '../../components/horizontal-line';

import { ReactComponent as Genes } from '../../images/genes.svg';
import { ReactComponent as Experiments } from '../../images/experiments.svg';
import { ReactComponent as Signatures } from '../../images/signatures.svg';

import './index.css';

const Home = () => (
  <>
    <Header />
    <Main>
      <Banner
        text='Adage is a tool to help you explore and discover new insights from
      machine learning models'
      />
      <HorizontalLine />
      <Feature
        left
        icon={<Genes />}
        header='explore genes...'
        text='Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip'
        to='genes'
      />
      <HorizontalLine />
      <Feature
        icon={<Experiments />}
        header='explore experiments...'
        text='Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip'
        to='experiments'
      />
      <HorizontalLine />
      <Feature
        left
        icon={<Signatures />}
        header='explore signatures...'
        text='Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip'
        to='signatures'
      />
    </Main>
    <Footer />
  </>
);

export default Home;
