FROM node:bullseye
WORKDIR /app
COPY package.json /app
RUN npm install
EXPOSE 4000
ARG NODE_ENV
ENV NODE_ENV $NODE_ENV

COPY . /app

CMD ["npm", "start"]
