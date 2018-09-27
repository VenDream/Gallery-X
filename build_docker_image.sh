#!/bin/sh

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

# 清理临时目录
echo '========================='
echo '[INFO] clean temp dirs...'
echo '========================='
rm -rf server/dist \
&& rm -rf server/logs \
&& rm -rf var/static

# 按照依赖
echo '========================='
echo '[INFO] install deps...'
echo '========================='
npm install --unsafe-perm || exit 1

# 构建后端代码
echo '========================='
echo '[INFO] build server app...'
echo '========================='
npm run build-server || exit 1

# 构建前端代码
echo '========================='
echo '[INFO] build static app...'
echo '========================='
npm run build-static || exit 1

# 构建docker镜像
echo '========================='
echo '[INFO] build docker image...'
echo '========================='
cd $rootdir
docker build -t $img . \
&& docker tag $img $img:$tag \
|| exit 0

echo '========================='
echo '[INFO] Done.'
echo "[INFO] Image name: $img"
echo "[INFO] Image tag: $tag"
echo '========================='