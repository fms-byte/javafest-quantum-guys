#!/bin/bash

# Navigate to the frontend directory
cd frontend

# Install npm packages
npm install

# Check if npm install was successful
if [ $? -ne 0 ]; then
  echo "npm install failed. Exiting."
  exit 1
fi

# # Run build
# npm run build

# # Check if npm build was successful
# if [ $? -ne 0 ]; then
#   echo "npm build failed. Exiting."
#   exit 1
# fi

# Run the frontend application
npm run dev
