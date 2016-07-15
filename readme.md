# Create the CA Key and Certificate for socket.io
```
openssl genrsa -des3 -out ./storage/ssl/ca.key 4096
openssl req -new -x509 -days 365 -key ./storage/ssl/ca.key -out ./storage/ssl/ca.crt
```

```
openssl genrsa -des3 -out ./storage/ssl/client.key 1024
openssl req -new -key ./storage/ssl/client.key -out ./storage/ssl/client.csr

```
# Sign the client certificate with our CA cert.  Unlike signing our own server cert, this is what we want to do.

```
openssl x509 -req -days 365 -in ./storage/ssl/client.csr -CA ./storage/ssl/ca.crt -CAkey ./storage/ssl/ca.key -set_serial 01 -out ./storage/ssl/client.crt
```