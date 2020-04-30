const util = require('util');
const exec = util.promisify(require('child_process').exec);

module.exports = {
  async onInit() {
    console.log('deleting yarn.lock');
    await exec('rm yarn.lock');
    console.log('deleting node_modules');
    await exec('rm -rf node_modules');
    console.log('clearing yarn cache');
    await exec('yarn cache clean');
    console.log('running yarn install');
    await exec('yarn install');
  }
};
