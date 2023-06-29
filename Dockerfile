# From node image
FROM node:18.12-alpine

# Create destination directory
RUN mkdir -p /usr/src/nuxt-app

# Set working directory
WORKDIR /usr/src/nuxt-app

# Copy the app to the destination directory
COPY . /usr/src/nuxt-app

# Install dependencies using yarn
RUN yarn install

# Build the app
RUN yarn build

# Expose port 3000
EXPOSE 3000

# Run the app
ENV NUXT_HOST=0.0.0.0
ENV NUXT_PORT=3000

# Start the app
CMD [ "yarn", "start" ]