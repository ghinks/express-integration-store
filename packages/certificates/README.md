# `certificates`

In order to generate self signed certificates for local host I am adding this
helper tool it will generate the certificate and the key which can then be 
used to create the module.

## Usage

```
docker build -t create-ssl-certs:0.0.1 .
docker run -it --rm --mount type=bind,src="$(pwd)",target=/openssl-certs create-ssl-certs:0.0.1
```
