#!/bin/bash

# Navigate to the backend directory
cd backend

# Clean and build the project using Maven
./mvnw clean package

# Check if the build was successful
if [ $? -ne 0 ]; then
  echo "Build failed. Exiting."
  exit 1
fi

# Find the generated JAR file
JAR_FILE=$(find target -name "*.jar" | head -n 1)

# Check if the JAR file was found
if [ -z "$JAR_FILE" ]; then
  echo "JAR file not found. Exiting."
  exit 1
fi

# Run the JAR file
java -jar "$JAR_FILE"
