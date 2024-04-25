# FROM node:17-alpine as builder
# WORKDIR /app
# COPY package.json .
# COPY package-lock.json .
# RUN npm install
# COPY . .
# # COPY authentication.js .
# RUN npm run-script build


# FROM nginx:1.19.0
# WORKDIR /usr/share/nginx/html
# RUN rm -rf ./*
# COPY --from=builder /app/build .
# ENTRYPOINT ["nginx", "-g", "daemon off;"]


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