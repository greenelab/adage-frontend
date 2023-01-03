import React from 'react';

import Header from '../header';
import Main from '../main';
import Footer from '../footer';
import Section from '../../components/section';
import { App } from './app';
import { Models } from './models';

import './index.css';

// about page

const About = () => (
  <>
    <Header />
    <Main>
      <Section header='About the App'>
        <App />
      </Section>
      <Section header='About the Model'>
        <Models />
      </Section>
    </Main>
    <Footer />
  </>
);

export default About;
