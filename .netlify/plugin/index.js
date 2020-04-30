// clear contents of the Netlify build cache before each build
const clearCache = async ({ utils }) => {
  await utils.cache.remove('node_modules');
  const files = await utils.cache.list();
  console.log(`${files.length} cache files found`);
  for (const file of files) {
    console.log(`Deleting cache file ${file}`);
    await utils.cache.remove(file);
  }
};

// clear cache during build steps
module.exports = {
  async onInit({ utils }) {
    await clearCache({ utils });
  },
  async onEnd({ utils }) {
    await clearCache({ utils });
  }
};
