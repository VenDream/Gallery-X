#!/bin/sh

rm -rf logs

docker run -d \
  -it \
  -p 8000:8000 \
  -v "/$(pwd)/logs:/app/logs" \
  -v "/$(pwd)/var/server.config.json:/app/var/server.config.json" \
  -v "/$(pwd)/var/static.config.json:/app/var/static.config.json" \
  --rm \
  --name Gallery-X \
  vendream/gallery-x:latest