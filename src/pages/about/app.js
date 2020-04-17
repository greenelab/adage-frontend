import React from 'react';

import Clickable from '../../components/clickable';

import { ReactComponent as GitHubIcon } from '../../images/github.svg';
import { ReactComponent as AlertIcon } from '../../images/alert.svg';
import { ReactComponent as MailIcon } from '../../images/mail.svg';

import './app.css';

const App = () => (
  <>
    <p className='help_header weight_semibold size_medium'>What is Adage?</p>
    <p>
      Adage is a web app that allows users to analyze signatures from certain
      types of unsupervised machine learning models. The app comes with and was
      originally designed for two specific models, detailed in these papers:{' '}
      <a href='https://msystems.asm.org/content/1/1/e00025-15'>ADAGE</a> and{' '}
      <a href='https://www.biorxiv.org/content/10.1101/078659v3'>eADAGE</a>.
    </p>
    <p className='help_header weight_semibold size_medium'>Links</p>
    <p>
      The code for this app is open source and available on GitHub, with
      instructions on how to load your own machine learning model and how to
      make modifications to the app.
    </p>
    <p className='help_buttons'>
      <Clickable
        icon={<GitHubIcon />}
        text='Front End'
        to='https://github.com/greenelab/adage-frontend'
        button
        flip
        aria-label='The app itself. Gets data from the back end and presents it.'
      />
      <Clickable
        icon={<GitHubIcon />}
        text='Back End'
        to='https://github.com/greenelab/py3-adage-backend'
        button
        flip
        aria-label='The database. Model data is loaded here, and is provided to the front end.'
      />
      <Clickable
        icon={<AlertIcon />}
        text='Report an Issue'
        to='https://github.com/greenelab/adage-frontend/issues'
        button
        flip
        aria-label='Report an issue or suggest a feature for the app'
      />
      <Clickable
        icon={<MailIcon />}
        text='Contact the Team'
        to='mailto:team@greenelab.com'
        button
        flip
        aria-label='Send an email to the team for any general inquiries'
      />
    </p>
    <p className='help_header weight_semibold size_medium'>Citing</p>
    <p>To cite this app in general:</p>
    <div className='cite_box'>
      <div className='weight_medium'>
        ADAGE signature analysis: differential expression analysis with
        data-defined gene sets
      </div>
      <div>
        Jie Tan, Matthew Huyck, Dongbo Hu, René A. Zelaya, Deborah A. Hogan,
        Casey S. Greene
      </div>
      <div>
        <a href='https://bmcbioinformatics.biomedcentral.com/articles/10.1186/s12859-017-1905-4'>
          BMC Bioinformatics
        </a>{' '}
        (2017)
      </div>
    </div>
    <p>To cite the specific built-in machine learning models:</p>
    <div className='cite_box'>
      <div className='weight_medium'>
        Unsupervised Extraction of Stable Expression Signatures from Public
        Compendia with an Ensemble of Neural Networks
      </div>
      <div>
        Jie Tan, Georgia Doing, Kimberley A. Lewis, Courtney E. Price, Kathleen
        M. Chen, Kyle C. Cady, Barret Perchuk, Michael T. Laub, Deborah A.
        Hogan, Casey S. Greene
      </div>
      <div>
        <a href='https://www.cell.com/cell-systems/fulltext/S2405-4712(17)30231-4'>
          Cell Systems
        </a>{' '}
        (2017)
      </div>
    </div>
  </>
);

export { App };
