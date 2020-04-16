import React from 'react';

import Header from '../header';
import Main from '../main';
import Footer from '../footer';
import Section from '../../components/section';
import { About } from './about';
import { Usage } from './usage';

import './index.css';

// help page

const Help = () => (
  <>
    <Header />
    <Main>
      <Section header='About'>
        <About />
      </Section>
      <Section header='Usage'>
        <Usage />
      </Section>
    </Main>
    <Footer />
  </>
);

export default Help;
