FROM node:16

WORKDIR /src

# Copy package.json and yarn.lock files
COPY package.json yarn.lock /src/

# Install dependencies
RUN yarn install --frozen-lockfile

COPY . .

# Rebuild bcrypt package
RUN yarn add bcrypt

# Build the application
RUN yarn build

# Expose port 3000
EXPOSE 3000

# Command to run the application
CMD ["node", "dist/server.js"]
