import React from 'react';
import PropTypes from 'prop-types';

import Clickable from '../../../components/clickable';

import './index.css';

// feature row with thumbnail and summary text

const Feature = ({ left, image, icon, text, to, children }) => {
  const thumbnail = (
    <div className='pane pane_first'>
      <img className='thumbnail' src={image} alt='' />
    </div>
  );

  const notThumbnail = (
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
        {thumbnail}
        {notThumbnail}
      </>
    );
  } else {
    content = (
      <>
        {notThumbnail}
        {thumbnail}
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
  image: PropTypes.string.isRequired,
  icon: PropTypes.element.isRequired,
  text: PropTypes.string.isRequired,
  to: PropTypes.string.isRequired
};

export default Feature;
