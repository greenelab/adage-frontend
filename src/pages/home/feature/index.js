import React from 'react';
import PropTypes from 'prop-types';

import Clickable from '../../../components/clickable';

import { ReactComponent as ArrowIcon } from '../../../images/arrow.svg';

import './index.css';

// feature row with video and summary text

const Feature = ({ left, icon, header, to, children }) => {
  const video = (
    <div className='pane pane_first'>
      <div className='video'></div>
    </div>
  );

  const notVideo = (
    <div className='pane'>
      <div className='feature_header weight_medium'>
        {icon}
        {header}
      </div>
      <p>{children}</p>
      <Clickable to={to} text='Go' icon={<ArrowIcon />} button />
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
  to: PropTypes.string.isRequired
};

export default Feature;
