import React from 'react';
import { connect } from 'react-redux';

import Header from '../header';
import Main from '../main';
import Footer from '../footer';
import Details from './details.js';
import SectionHeader from '../../components/section-header';
import { getModelDetails } from '../../reducers/models.js';

import './index.css';

const Model = connect(getModelDetails)(({ match, ...props }) => (
  <>
    <Header justTitle />
    <Main>
      <SectionHeader text='Model Details' />
      <Details details={props.details || {}} />
    </Main>
    <Footer />
  </>
));

export default Model;
