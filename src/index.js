import React from 'react';
import { render } from 'react-dom';
import * as Sentry from '@sentry/react';
import { Integrations } from '@sentry/tracing';

import App from './app';

Sentry.init({
  dsn:
    'https://016df0e3771549f982401f272df8b7e4@o7983.ingest.sentry.io/5438025', // api key
  environment: process.env.NODE_ENV, // production or development
  integrations: [new Integrations.BrowserTracing()],
  tracesSampleRate: 1.0
});

render(<App />, document.getElementById('root'));
