import React from 'react';

import Clickable from '../../components/clickable';
import { useScript } from '../../util/hooks';

import { ReactComponent as GitHubIcon } from '../../images/github.svg';
import { ReactComponent as AlertIcon } from '../../images/alert.svg';
import { ReactComponent as MailIcon } from '../../images/mail.svg';
import GBMFLogo from '../../images/gordon-betty-moore-foundation.png';
import DCFLogo from '../../images/dart-cf.png';

import './app.css';

const App = () => {
  // import altmetric widget script
  useScript('https://d1bxh8uas1mnw7.cloudfront.net/assets/embed.js');

  return (
    <>
      <p className='help_header weight_semibold size_medium'>What is Mousiplier?</p>
      <p>
        This web app allows users to analyze signatures from the Mousiplier model. 
        To read more, see the paper introducing the 
        Mousiplier model below: 
      </p>
      <p className='help_centered'>
        <span className='help_link'>
          <a href='https://bmcbioinformatics.biomedcentral.com/articles/10.1186/s12859-017-1905-4'>ADAGE</a>{' '}
          <span
            data-badge-popover='left'
            data-badge-type='donut'
            data-doi='10.1186/s12859-017-1905-4'
            className='altmetric_small altmetric-embed'
          />
        </span>
        {/* TODO */}
        {/* <span className='help_link'>
          <a href='TODO'>Mousiplier</a>
          <span
            data-badge-type='donut'
            data-doi='TODO'
            className='altmetric_small altmetric-embed'
          />
        </span> */}
      </p>
      <p className='help_header weight_semibold size_medium'>Links</p>
      <p>
        The code for this app is open source and available on GitHub, with
        instructions on how to load your own machine learning model and how to
        make modifications to the app.
      </p>
      <p className='help_centered'>
        <Clickable
          icon={<GitHubIcon />}
          text='Front End'
          to='https://github.com/greenelab/mousiplier-frontend'
          button
          flip
          aria-label='The app itself. Gets data from the back end and presents it.'
        />
        <Clickable
          icon={<GitHubIcon />}
          text='Back End'
          to='https://github.com/greenelab/mousiplier-backend'
          button
          flip
          aria-label='The database. Model data is loaded here, and is provided to the front end.'
        />
        <Clickable
          icon={<AlertIcon />}
          text='Report an Issue'
          to='https://github.com/greenelab/mousiplier-frontend/issues'
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
      <p>To cite Mousiplier:</p>
      <div className='cite_frame'>
        <div className='cite_box'>
          <div className='weight_medium'>
            Unsupervised Extraction of Stable Expression Signatures from Public
            Compendia with an Ensemble of Neural Networks
          </div>
          <div>
            Jie Tan, Georgia Doing, Kimberley A. Lewis, Courtney E. Price,
            Kathleen M. Chen, Kyle C. Cady, Barret Perchuk, Michael T. Laub,
            Deborah A. Hogan, Casey S. Greene
          </div>
          <div>
            <a href=''>
              <i>Journal</i>
            </a>{' '}
            · 2023 · DOI: DOI HERE
          </div>
        </div>
        {/* TODO */}
        {/* <div className='altmetric'>
          <div
            data-badge-popover='left'
            data-badge-type='donut'
            data-doi='TODO'
            className='altmetric-embed'
          />
        </div> */}
      </div>
      <p className='help_header weight_semibold size_medium'>Funding</p>
      <p>
        This project was made possible by funding from the{' '}
        <a href='https://www.moore.org/grant-detail?grantId=GBMF4552'>
          Gordon and Betty Moore Foundation
        </a>{' '}
        (GBMF4552) and the{' '}
        <a href='https://sites.dartmouth.edu/dartcf/'>
          TODO add other funding sources
        </a>{' '}
        (TODO).
      </p>
      <p className='help_centered'>
        <a className='help_image' href='https://www.moore.org/'>
          <img
            src={GBMFLogo}
            height='50px'
            alt='Gordon and Betty Moore Foundation'
          />
        </a>
        <a className='help_image' href='https://sites.dartmouth.edu/dartcf/'>
          <img
            src={DCFLogo}
            height='50px'
            alt='Dartmouth Cystic Fibrosis Research Center'
          />
        </a>
      </p>
    </>
  );
};

export { App };
