rm -f ./yarn.lock
rm -rf ./node_modules
yarn cache clean
yarn install
node ./scripts/build.js
