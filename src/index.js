import React from 'react';
import { render } from 'react-dom';
import App from './app.js';

window.sessionStorage.clear();

render(<App />, document.getElementById('root'));
