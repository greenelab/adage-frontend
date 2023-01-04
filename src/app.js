import React from 'react';
import { Router } from 'react-router-dom';
import { Route } from 'react-router-dom';
import { Switch } from 'react-router-dom';
import { compose } from 'redux';
import { createStore } from 'redux';
import { applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import sequenceAction from 'redux-sequence-action';
import { createLogger } from 'redux-logger';

import Controllers from './controllers';
import Tooltip from './components/tooltip';
import Head from './pages/head';
import Home from './pages/home';
import Genes from './pages/genes';
import Experiments from './pages/experiments';
import Signatures from './pages/signatures';
import About from './pages/about';
import Model from './pages/model';
import Organism from './pages/organism';
import Gene from './pages/gene';
import Experiment from './pages/experiment';
import Sample from './pages/sample';
import reducer from './reducers';
import { basename } from './reducers/url';
import { history } from './reducers/url';
import { querySync } from './reducers/url';

import packageJson from './../package.json';

import './util/debug';

import './app.css';

// log some important overall things for the app
console.groupCollapsed('Package.json');
console.log(packageJson);
console.groupEnd();
console.groupCollapsed('Environment variables');
console.log(process.env);
console.log({ basename });
console.groupEnd();

// redux logger
const logger = createLogger({
  collapsed: true,
  timestamp: false,
  titleFormatter: ({ type = '' }) => type
});

// redux store
const store = createStore(
  reducer,
  compose(querySync, applyMiddleware(sequenceAction, thunk, logger))
);

// entry point to the app
const App = () => (
  <Provider store={store}>
    <Controllers />
    <Router basename={basename} history={history}>
      <Head />
      <Switch>
        <Route path='/genes' component={Genes} />
        <Route path='/experiments' component={Experiments} />
        <Route path='/latent-variables' component={Signatures} />
        <Route path='/about' component={About} />
        <Route path='/model/:id' component={Model} />
        <Route path='/organism/:id' component={Organism} />
        <Route path='/gene/:id' component={Gene} />
        <Route path='/experiment/:id' component={Experiment} />
        <Route path='/sample/:id' component={Sample} />
        <Route path='/' component={Home} />
      </Switch>
    </Router>
    <Tooltip />
  </Provider>
);

export default App;
