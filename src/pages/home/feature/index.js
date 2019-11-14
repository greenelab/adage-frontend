import React from 'react';
import PropTypes from 'prop-types';

import LinkTextIcon from '../../../components/link-text-icon';

import { ReactComponent as Arrow } from '../../../images/arrow.svg';

import './index.css';

const Feature = ({ left, icon, header, text, to }) => {
  const video = (
    <div className='pane pane_first'>
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
      <LinkTextIcon to={to} text='Go' icon={<Arrow />} />
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
      <div className='feature'>{content}</div>
    </section>
  );
};

Feature.propTypes = {
  icon: PropTypes.element.isRequired,
  header: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  to: PropTypes.string.isRequired
};

export default Feature;
