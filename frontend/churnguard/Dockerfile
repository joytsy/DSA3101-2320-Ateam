# pull official base image
FROM node:19.8.1-alpine3.17

EXPOSE 3000

# set working directory
WORKDIR /churnguard

# add `/app/node_modules/.bin` to $PATH
ENV PATH /churnguard/node_modules/.bin:$PATH

# install app dependencies
COPY package*.json ./

RUN npm install 

# Bundle app source
COPY . .

# start app
CMD ["npm", "start"]