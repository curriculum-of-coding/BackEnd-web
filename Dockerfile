FROM node:14.16

#FROM ubuntu:20.04

LABEL "purpose" = "To set same running environment"

RUN sed -i 's/archive.ubuntu.com/ftp.daumkakao.com/g' /etc/apt/sources.list
RUN apt-get update
RUN apt-get install -y nginx
RUN echo "daemon off;" >> /etc/nginx/nginx.conf
RUN rm -rf /etc/nginx/sites-enabled/default
COPY nginx.conf /etc/nginx/sites-enabled/nginx.conf

# install programming language & tools to run server based on node.js

RUN mkdir /root/Backend
RUN mkdir /root/Backend/dist
WORKDIR /root/Backend

COPY package*.json /root/Backend/
COPY tsconfig.json /root/Backend

RUN npm install
COPY /src /root/Backend/src

ENV PORT 5000
EXPOSE $PORT

CMD ["npm", "start"]
