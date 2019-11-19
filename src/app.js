import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Route } from 'react-router-dom';
import { Switch } from 'react-router-dom';

import Home from './pages/home';
import Genes from './pages/genes';
import Experiments from './pages/experiments';
import Signatures from './pages/signatures';
import Help from './pages/help';

import './app.css';

const basename = process.env.PUBLIC_URL;

const App = () => (
  <BrowserRouter basename={basename}>
    <Switch>
      <Route exact path='/' component={Home} />
      <Route path='/genes' component={Genes} />
      <Route path='/experiments' component={Experiments} />
      <Route path='/signatures' component={Signatures} />
      <Route path='/help' component={Help} />
    </Switch>
  </BrowserRouter>
);

export default App;
