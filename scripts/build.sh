# clear cache and start from blank slate
# mainly for the benefit of Netlify:
# https://github.com/greenelab/adage-frontend/issues/130


COLOR='\033[0;31m'

echo -e "${COLOR}Deleting yarn.lock"
rm -f ./yarn.lock

# if no yarn.lock, Netlify assumes npm and installs packages incorrectly
echo -e "${COLOR}=== Creating blank yarn.lock ==="
touch ./yarn.lock

echo -e "${COLOR}=== Deleting node_modules ==="
rm -rf ./node_modules

echo -e "${COLOR}=== Clearing yarn cache ==="
yarn cache clean

echo -e "${COLOR}=== Installing yarn packages ==="
yarn install

echo -e "${COLOR}=== Running build script ==="
node ./scripts/build.js
