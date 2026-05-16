#!/bin/bash

# Test build script for Kyrin Labs website

echo "Building Kyrin Labs website..."

# Clean public directory
rm -rf public

# Build the site
hugo --minify

# Check if build was successful
if [ $? -eq 0 ]; then
    echo "Build successful!"
    echo "Site built in: public/"
    echo "
To preview the site, run:"
    echo "  hugo server"
else
    echo "Build failed!"
    exit 1
fi