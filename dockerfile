FROM node:14.17.0

WORKDIR /zawash

COPY package*.json .

RUN npm install

COPY . .

CMD node index.js
