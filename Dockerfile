FROM node:18

WORKDIR D:/do/back

COPY package*.json ./

RUN npm install

RUN npm install -g ts-node-dev

RUN apt-get update && apt-get install -y curl

COPY . .

EXPOSE 8000
