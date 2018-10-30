#!/bin/bash

# 镜像名
img=vendream/gallery-x
# 最新一次commit的md5值
hash=`git log | head -1 | awk '{print $2}'`
# 取前10位作为镜像hash
short=${hash:0:10}
# 时间戳
timestamp=$(date '+%Y%m%d-%H%M')
# 生成唯一标签
tag=$timestamp-$short
# 记录当前目录为项目根目录
rootdir=$(pwd)

# 颜色变量
NC='\033[0m'
RED='\033[0;31m'
GREEN='\033[0;32m'
# 通用打印函数
print_info() {
  MSG=$1
  printf "${GREEN}---------------------------------------${NC}\n"
  printf "${GREEN}[$(date +'%Y-%m-%d %H:%M:%S')] ${MSG}${NC}\n"
  printf "${GREEN}---------------------------------------${NC}\n"
}

# 清理临时目录
print_info 'Clean temp dirs...'
rm -rf server/dist \
&& rm -rf server/logs \
&& rm -rf var/static

# 安装依赖
print_info 'Install dependencies...'
npm install --unsafe-perm || exit 1

# 构建后端代码
print_info 'Build server app...'
npm run build-server || exit 1

# 构建前端代码
print_info 'Build static app...'
npm run build-static || exit 1

# 构建docker镜像
print_info 'Build docker image...'
cd $rootdir
docker build -t $img . \
&& docker tag $img $img:$tag \
|| exit 0
print_info "Done, name=$img, tag=$tag"

# 上传前端静态文件到CDN
print_info 'Upload files to CDN...'
sh upload_static_files.sh

# 打印总耗时
print_info "Execution time: $SECONDS secs"