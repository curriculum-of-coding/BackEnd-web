FROM mongo:latest

# Define mountable directories.
VOLUME ["/data/db"]

# Define working directory.
WORKDIR /data

RUN apt-get update\
 && apt-get install -y vim \
 && apt-get install -y ubuntu-snappy-cli \
 && apt-get install -y zlib1g-dev

COPY mongod.conf.orig /etc/

CMD ["mongod"]

EXPOSE 27017
