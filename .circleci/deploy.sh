#!/bin/bash

# Save the Django-REST-Framework related sub-folders in "static/" first
rm -rf /tmp/drf && mkdir /tmp/drf/
mv ~ubuntu/www/static/admin/ ~ubuntu/www/static/rest_framework/ /tmp/drf/

# Copy everything in "build/"
rm -rf ~ubuntu/www/*
mv /tmp/build/* ~ubuntu/www/

# Move the Django-REST-Framework related sub-folders back to "static/"
mv /tmp/drf/* ~ubuntu/www/static/

# Clean up
rmdir /tmp/drf
rmdir /tmp/build
