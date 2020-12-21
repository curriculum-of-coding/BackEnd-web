FROM ubuntu:20.04

LABEL "purpose" = "To set same running environment"

# install programming language & tools to run server based on node.js
RUN apt-get update
RUN apt-get install -y nodejs npm

RUN mkdir /root/Backend
ADD ./Backend /root/Backend
WORKDIR /root/Backend

RUN npm install

EXPOSE 8000

CMD ["npm", "start"]
