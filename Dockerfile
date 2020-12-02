FROM node:13

# Create app directory
WORKDIR /app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json /app

RUN npm install
# If you are building your code for production
# RUN npm ci --only=production

# Bundle app source
COPY . .
# COPY server /app
# COPY uploads /app
# COPY Dockerfile /app

EXPOSE 5000

CMD ["npm","start"]

# WORKDIR /app/client

# COPY package*.json /app/client

# RUN npm install
# RUN npm i firebase-tools
# RUN npm install firebase

# COPY . .

# EXPOSE 3000

# WORKDIR /app

# CMD ["npm","run","dev"]