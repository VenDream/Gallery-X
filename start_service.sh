#!/bin/bash

# 拉取最新镜像
docker-compose pull
# 重启服务
docker-compose down
docker-compose up -d