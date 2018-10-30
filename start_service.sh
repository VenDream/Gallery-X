#!/bin/bash

# 拉取最新镜像
docker pull vendream/gallery-x:latest
# 停掉原有容器
docker stop Gallery-X
# 从新镜像启动新的容器
docker run -d \
  -it \
  -p 8000:8000 \
  -v "/$(pwd)/logs:/app/logs" \
  -v "/$(pwd)/var/server.config.json:/app/var/server.config.json" \
  -v "/$(pwd)/var/static.config.json:/app/var/static.config.json" \
  --rm \
  --name Gallery-X \
  vendream/gallery-x:latest