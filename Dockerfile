FROM node:latest

#FROM ubuntu:20.04

LABEL "purpose" = "To set same running environment"

RUN sed -i 's/archive.ubuntu.com/ftp.daumkakao.com/g' /etc/apt/sources.list
RUN apt-get update
# install programming language & tools to run server based on node.js
RUN apt-get install -y mongodb

RUN mkdir /root/Backend
RUN mkdir /root/Backend/dist
WORKDIR /root/Backend

COPY package*.json /root/Backend
COPY tsconfig.json /root/Backend

RUN npm install
COPY /src /root/Backend/src

ENV PORT 5000
EXPOSE $PORT

CMD ["npm", "start"]
