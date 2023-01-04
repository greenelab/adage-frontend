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
      <Banner>
        Mousiplier helps you explore gene expression data and discover new insights
        from mouse gene expression.
      </Banner>
      <HorizontalLine />
      <Feature
        left
        image={genes1}
        icon={<GeneIcon />}
        text='Explore Genes'
        to='/genes'
      >
        See how genes relate to each other, other genes, and how they are
        represented in Mousiplier's latent variables. Visualize the gene
        network as an interactive graph display.
      </Feature>
      <HorizontalLine />
      <Feature
        image={experiments1}
        icon={<ExperimentIcon />}
        text='Explore Experiments'
        to='/experiments'
      >
        View the activities of experiment samples as a colored heatmap, and
        cluster them on the fly. Group samples however you want and
        visualize the difference in activities between them as a volcano plot.
      </Feature>
      <HorizontalLine />
      <Feature
        left
        image={signatures1}
        icon={<SignatureIcon />}
        text='Explore Latent Variables'
        to='/latent-variables'
      >
        Understand the Mousiplier latent variables by exploring the
        genes that contribute, the experiments in which they vary the most, and
        which pathways they significantly overlap with.
      </Feature>
    </Main>
    <Footer />
  </>
);

export default Home;
