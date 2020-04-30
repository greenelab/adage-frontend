# clear cache and start from blank slate
# mainly for the benefit of Netlify:
# https://github.com/greenelab/adage-frontend/issues/130


COLOR='\033[0;31m'
COLOROFF='\033[0m'

echo -e "${COLOR}=== Deleting yarn.lock ===${COLOROFF}"
rm -f ./yarn.lock

# if no yarn.lock, Netlify assumes npm and installs packages incorrectly
echo -e "${COLOR}=== Creating blank yarn.lock ===${COLOROFF}"
touch ./yarn.lock

echo -e "${COLOR}=== Deleting node_modules ===${COLOROFF}"
rm -rf ./node_modules

echo -e "${COLOR}=== Clearing yarn cache ===${COLOROFF}"
yarn cache clean

echo -e "${COLOR}=== Installing yarn packages ===${COLOROFF}"
yarn install

echo -e "${COLOR}=== Running build script ===${COLOROFF}"
node ./scripts/build.js
