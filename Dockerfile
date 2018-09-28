FROM node:8

LABEL version="1.0.0" description="Gallery-X"

# 工作目录
WORKDIR /app

# 容器使用8000端口
EXPOSE 8000
# 传递环境变量
ENV NODE_ENV=production PORT=8000 NPM_CONFIG_REGISTRY=https://registry.npm.taobao.org

# 全局安装pm2模块
RUN npm i -g pm2 \
  # 需要安装pm2-intercom模块，否则log4js日志不输出
  && pm2 install pm2-intercom

# 复制服务端文件，前端静态文件和配置文件
COPY server /app/server
COPY var /app/var
COPY ecosystem.config.yaml package.json /app/

# 使用pm2-docker启动程序
CMD ["pm2-docker", "start", "ecosystem.config.yaml"]