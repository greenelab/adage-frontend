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

import Controller from './controller.js';
import Head from './pages/head';
import Home from './pages/home';
import Genes from './pages/genes';
import Experiments from './pages/experiments';
import Signatures from './pages/signatures';
import Help from './pages/help';
import Model from './pages/model';
import Gene from './pages/gene';
import reducer from './reducers';
import { history } from './reducers/url.js';
import { querySync } from './reducers/url.js';

import './util/debug.js';

import './app.css';

const logger = createLogger({
  collapsed: true
});

const store = createStore(
  reducer,
  compose(applyMiddleware(sequenceAction, thunk, logger), querySync)
);

const basename = process.env.REACT_APP_BASENAME;

const App = () => (
  <Provider store={store}>
    <Router basename={basename} history={history}>
      <Controller />
      <Head />
      <Switch>
        <Route exact path='/' component={Home} />
        <Route path='/genes' component={Genes} />
        <Route path='/experiments' component={Experiments} />
        <Route path='/signatures' component={Signatures} />
        <Route path='/help' component={Help} />
        <Route path='/model/:id' component={Model} />
        <Route path='/gene/:id' component={Gene} />
      </Switch>
    </Router>
  </Provider>
);

export default App;
