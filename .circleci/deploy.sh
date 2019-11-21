#!/bin/bash

mv /tmp/build/static/* ~ubuntu/www/static/
rmdir /tmp/build/static/
mv /tmp/build/* ~ubuntu/www/
rmdir /tmp/build/
