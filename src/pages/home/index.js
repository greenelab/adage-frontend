import React from 'react';

import Main from '../main';
import Header from './header';
import Banner from './banner';
import Feature from './feature';
import Footer from '../footer';
import HorizontalLine from '../../components/horizontal-line';

import { ReactComponent as GeneIcon } from '../../images/gene.svg';
import { ReactComponent as ExperimentIcon } from '../../images/experiment.svg';
import { ReactComponent as SignatureIcon } from '../../images/signature.svg';

import './index.css';

// home page

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
        icon={<GeneIcon />}
        header='explore genes...'
        text='Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip'
        to='/genes'
      />
      <HorizontalLine />
      <Feature
        icon={<ExperimentIcon />}
        header='explore experiments...'
        text='Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip'
        to='/experiments'
      />
      <HorizontalLine />
      <Feature
        left
        icon={<SignatureIcon />}
        header='explore signatures...'
        text='Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip'
        to='/signatures'
      />
    </Main>
    <Footer />
  </>
);

export default Home;
