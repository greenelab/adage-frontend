echo "deleting yarn.lock"
rm -f ./yarn.lock
echo "creating blank yarn.lock"
touch ./yarn.lock
echo "deleting node_modules"
rm -rf ./node_modules
echo "clearing yarn cache"
yarn cache clean
echo "installing yarn packages"
yarn install
echo "running build script"
node ./scripts/build.js
