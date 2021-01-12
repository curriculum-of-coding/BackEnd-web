FROM node:12-alpine

LABEL "purpose" = "To set same running environment"

# install programming language & tools to run server based on node.js
# RUN apt-get update
# RUN apt-get install -y nodejs npm

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
