import React from 'react';
import PropTypes from 'prop-types';

import Clickable from '../../../components/clickable';

import './index.css';

// feature row with video and summary text

const Feature = ({ left, icon, text, to, children }) => {
  const video = (
    <div className='pane pane_first'>
      <div className='video'></div>
    </div>
  );

  const notVideo = (
    <div className='pane'>
      <Clickable
        className='feature_button'
        to={to}
        text={text}
        icon={icon}
        button
        flip
      />
      <p>{children}</p>
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
  text: PropTypes.string.isRequired,
  to: PropTypes.string.isRequired
};

export default Feature;
