FROM mongo:latest

# Define mountable directories.
VOLUME ["/data/db"]

# Define working directory.
WORKDIR /data

RUN apt-get update\
 && apt-get install -y vim 

COPY mongod.conf.orig /etc/

CMD ["mongod"]

EXPOSE 27017
