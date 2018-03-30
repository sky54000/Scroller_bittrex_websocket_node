FROM node:carbon

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY src/package*.json ./

RUN apt-get update && apt-get install -y mysql-client libmysqlclient15-dev mysql-common


RUN npm install
# If you are building your code for production
# RUN npm install --only=production

# Bundle app source
COPY src/ .

EXPOSE 80
EXPOSE 3306
CMD [ "node", "bittrex_listener.js" ]
