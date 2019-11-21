#!/bin/bash

# Remove original directories built in "static/" dir
cd ~ubuntu/www/static/
rm -rf css/ js/ media/

# Copy new files in "build/" directory
mv /tmp/build/static/* ~ubuntu/www/static/
rmdir /tmp/build/static/
mv /tmp/build/* ~ubuntu/www/
rmdir /tmp/build/
