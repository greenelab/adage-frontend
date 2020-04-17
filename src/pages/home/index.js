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
import genes1 from '../../images/genes-1.jpg';
import experiments1 from '../../images/experiments-1.jpg';
import signatures1 from '../../images/signatures-1.jpg';

import './index.css';

// home page

const Home = () => (
  <>
    <Header />
    <Main>
      <Banner />
      <HorizontalLine />
      <Feature
        left
        image={genes1}
        icon={<GeneIcon />}
        text='Explore Genes'
        to='/genes'
      >
        Find signatures that significantly overlap with the genes you're
        interested in to interpret underlying biological processes. Visualize
        your model's gene network as an interactive graph display.
      </Feature>
      <HorizontalLine />
      <Feature
        image={experiments1}
        icon={<ExperimentIcon />}
        text='Explore Experiments'
        to='/experiments'
      >
        View the activities of your experiment samples as a colored heatmap, and
        cluster them on the fly. Group your samples however you want and
        visualize the difference in activities between them as a volcano plot.
      </Feature>
      <HorizontalLine />
      <Feature
        left
        image={signatures1}
        icon={<SignatureIcon />}
        text='Explore Signatures'
        to='/signatures'
      >
        Find the genes that most strongly influence a signature's activity.
        Explore experiments with the highest range of activities within a
        signature. See canonical/curated gene sets that significantly overlap
        with a signature's associated genes.
      </Feature>
    </Main>
    <Footer />
  </>
);

export default Home;
