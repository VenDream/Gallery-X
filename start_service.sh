#!/bin/sh

docker run -d \
  -it \
  -p 8000:8000 \
  -v "$(pwd -W)/var:/app/var" \
  --name Gallery-X \
  vendream/gallery-x:latest