import React from 'react';
import PropTypes from 'prop-types';
import Layout from '../../layouts/home';
import LinkTextIcon from '../../components/link-text-icon';

import { ReactComponent as Arrow } from '../../images/arrow.svg';
import { ReactComponent as Genes } from '../../images/genes.svg';
import { ReactComponent as Experiments } from '../../images/experiments.svg';
import { ReactComponent as Signatures } from '../../images/signatures.svg';

import './index.css';

const Home = () => (
  <Layout>
    <section>
      <h3 className='banner'>
        Adage is a tool to help you explore and discover new insights from
        machine learning models
      </h3>
      <LinkTextIcon to='/genes' text='Explore' icon={<Arrow />} />
    </section>
    <hr />
    <PaneRow
      left
      icon={<Genes />}
      header='explore genes...'
      text='Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
      eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
      minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip'
      to='/genes'
    />
    <hr />
    <PaneRow
      icon={<Experiments />}
      header='explore experiments...'
      text='Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
      eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
      minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip'
      to='/experiments'
    />
    <hr />
    <PaneRow
      left
      icon={<Signatures />}
      header='explore signatures...'
      text='Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
      eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
      minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip'
      to='/signatures'
    />
  </Layout>
);

export default Home;

const PaneRow = ({ left, icon, header, text, to }) => {
  const video = (
    <div className='pane'>
      <div className='video'></div>
    </div>
  );

  const notVideo = (
    <div className='pane'>
      <h3>
        {icon}
        {header}
      </h3>
      <p>{text}</p>
      <LinkTextIcon to={to} text='explore' icon={<Arrow />} />
    </div>
  );

  let content = <></>;
  if (left) {
    content = (
      <>
        {video}
        {notVideo}
      </>
    );
  } else {
    content = (
      <>
        {notVideo}
        {video}
      </>
    );
  }

  return (
    <section>
      <div className='pane_row'>{content}</div>
    </section>
  );
};

PaneRow.propTypes = {
  icon: PropTypes.element.isRequired,
  header: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  to: PropTypes.string.isRequired
};
