import React from 'react';
import { useEffect } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Route } from 'react-router-dom';
import { Switch } from 'react-router-dom';
import { compose } from 'redux';
import { createStore } from 'redux';
import { applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import sequenceAction from 'redux-sequence-action';
import { createLogger } from 'redux-logger';

import Home from './pages/home';
import Genes from './pages/genes';
import Experiments from './pages/experiments';
import Signatures from './pages/signatures';
import Help from './pages/help';
import reducer from './reducers';
import { setModels } from './actions/models.js';
import { setSelectedModel } from './actions/models.js';

import './app.css';

const logger = createLogger({
  collapsed: true
});

const store = createStore(
  reducer,
  compose(applyMiddleware(sequenceAction, thunk, logger))
);

const basename = process.env.REACT_APP_BASENAME;

const App = () => {
  useEffect(() => {
    store.dispatch([setModels(), setSelectedModel(0)]);
  }, []);

  return (
    <Provider store={store}>
      <BrowserRouter basename={basename}>
        <Switch>
          <Route exact path='/' component={Home} />
          <Route path='/genes' component={Genes} />
          <Route path='/experiments' component={Experiments} />
          <Route path='/signatures' component={Signatures} />
          <Route path='/help' component={Help} />
        </Switch>
      </BrowserRouter>
    </Provider>
  );
};

export default App;
