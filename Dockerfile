# Use Node.js 16 as the base image
FROM node:16

# Set working directory
WORKDIR /usr/src/app

# Copy package.json and package-lock.json (if exists)
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the project files
COPY . .

#Set default environment variable
ENV API_BASE_URL=https://fakerestapi.azurewebsites.net/api/v1

# Default command to run tests
CMD ["npm", "test"]