// reconfigure default create-react-app build script
// from https://github.com/facebook/create-react-app/issues/5306

const process = require('process');
const rewire = require('rewire');
const defaults = rewire('react-scripts/scripts/build.js');
const config = defaults.__get__('config');

// consolidate chunk files instead
config.optimization.splitChunks = {
  cacheGroups: {
    default: false
  }
};
// move runtime into bundle instead of separate file
config.optimization.runtimeChunk = false;

// add preceding "/basename" to build/index.html static resource urls
config.output.publicPath = (process.env.REACT_APP_BASENAME || '') + '/';

// JS
config.output.filename = 'static/js/main.js';
// CSS. "5" is MiniCssPlugin
config.plugins[5].options.filename = 'static/css/main.css';
config.plugins[5].options.moduleFilename = () => 'static/css/main.css';
