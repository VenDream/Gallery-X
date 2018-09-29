#!/bin/sh

rm -rf logs

docker run -d \
  -it \
  -p 8000:8000 \
  -v "/$(PWD)/logs:/app/logs" \
  -v "/$(PWD)/var/server.config.json:/app/var/server.config.json" \
  -v "/$(PWD)/var/static.config.json:/app/var/static.config.json" \
  --rm \
  --name Gallery-X \
  vendream/gallery-x:latest