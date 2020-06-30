FROM ubuntu:groovy
RUN apt-get update
RUN apt-get install -y openssl
WORKDIR /openssl-certs
COPY create-certs.sh .
RUN chmod 777 ./create-certs.sh
CMD ./create-certs.sh
