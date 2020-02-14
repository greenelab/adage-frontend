import React from 'react';
import { render } from 'react-dom';
import App from './app';

if (process.env.NODE_ENV === 'development') {
  const whyDidYouRender = require('@welldone-software/why-did-you-render');
  whyDidYouRender(React, {
    notifier: ({
      Component,
      displayName,
      prevProps,
      prevState,
      nextProps,
      nextState,
      reason,
      options
    }) => {
      console.log(reason);
    }
  });
}

render(<App />, document.getElementById('root'));
