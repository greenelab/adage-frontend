// clear contents of the Netlify build cache before each build
module.exports = {
  async onPreBuild({ utils }) {
    const files = await utils.cache.list();
    console.log(files.length, 'cache files found');
    for (const file of files) {
      console.log('Deleting cache file', file);
      await utils.cache.remove(file);
    }
  }
};
