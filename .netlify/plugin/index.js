const util = require('util');
const exec = util.promisify(require('child_process').exec);

// clear cache during build steps
module.exports = {
  async onInit() {
    console.log('clearing yarn cache')
    await exec('yarn cache clean');
    console.log('running yarn install')
    await exec('yarn install');
  },
};
