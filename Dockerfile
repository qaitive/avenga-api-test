# Use Node.js 16 as the base image
FROM node:20-slim

# Create a non-root user
#RUN useradd -ms /bin/bash appuser
#USER appuser

# Set working directory
WORKDIR /usr/src/app

# Copy package.json and package-lock.json (if exists)
COPY package*.json ./

#Install mocha globally

RUN npm install -g mocha@10.7.3

# Install dependencies
RUN npm install --include=dev

# Copy the rest of the project files
COPY . .

#Set default environment variable
ENV API_BASE_URL=https://fakerestapi.azurewebsites.net/api/v1

# Default command to run tests
CMD ["npm", "test"]