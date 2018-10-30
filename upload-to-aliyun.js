/**
 * 阿里云本地文件上传模块，需要node>=8.0.0
 * @author VenDream
 * @since 2018-10-30
 */

const fs = require('fs');
const path = require('path');
const parse = require('url-parse');
const OSS = require('ali-oss');
const colors = require('colors/safe');
const configFile = path.resolve(__dirname, 'var/static.config.json');

// 读取OSS上传配置
let staticConfig;
let ossConfig;
try {
  staticConfig = require(configFile);
  ossConfig = staticConfig['ali-oss'];
} catch (err) {
  die(err);
}
const { cdnPath, distDir } = staticConfig;
// 解析bucket前缀
const cdnPrefix = parse(cdnPath).pathname.slice(1);

// 上传前端静态文件到阿里云OSS
async function uploadToAliOSS(dir) {
  // 计数器
  let uploaded = 0;
  // 创建OSS客户端实例
  const { region, bucket, accessKey, secretKey } = ossConfig;
  const ossClient = new OSS({
    region,
    bucket,
    accessKeyId: accessKey,
    accessKeySecret: secretKey,
  });
  // 获取所有需要上传文件的本地路径
  const staticDistDir = dir || path.resolve(distDir);
  const files = getAllFiles(staticDistDir);
  logSucc(`[INFO] Found ${files.length} files`);
  // 逐个上传
  try {
    for (const file of files) {
      const cdnFilename = cdnPath + file.name;
      await ossClient.put(cdnPrefix + file.name, file.path);
      uploaded++;
      logSucc(`[${uploaded}/${files.length}] ${file.path} => ${cdnFilename}`);
    }
  } catch (err) {
    logErr(`[ERROR] ${err.message || 'upload error'}`);
  }
}
uploadToAliOSS();

// 从指定目录读取所有文件
function getAllFiles(dir, _files) {
  _files = _files || [];
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const pathname = dir + path.sep + file;
    if (fs.statSync(pathname).isDirectory()) {
      getAllFiles(pathname, _files);
    } else {
      _files.push({
        path: pathname,
        name: path.relative(distDir, pathname).replace(/\\/g, '/'),
      });
    }
  }
  return _files;
}

// 打印错误并退出
function die(err) {
  logErr(err.message);
  process.exit(1);
}
// 打印成功信息
function logSucc(...msg) {
  console.log(colors.green(...msg));
}
// 打印失败信息
function logErr(...msg) {
  console.error(colors.red(...msg));
}

module.exports = uploadToAliOSS;
