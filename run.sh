#!/bin/bash

# Run the spring.sh script
./spring.sh

# Check if the spring.sh script executed successfully
if [ $? -ne 0 ]; then
  echo "spring.sh execution failed. Exiting."
  exit 1
fi

# Navigate to the frontend directory
cd frontend

# Install npm packages
npm install

# Check if npm install was successful
if [ $? -ne 0 ]; then
  echo "npm install failed. Exiting."
  exit 1
fi

# Run the frontend application
npm run start
