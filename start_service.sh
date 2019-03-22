#!/bin/bash

# 拉取最新镜像
docker-compose pull
# 停止原服务
docker-compose down -v
# 启动服务
docker-compose up -d
# 删除无用镜像
yes | docker image prune
# 删除无用容器
yes | docker container prune