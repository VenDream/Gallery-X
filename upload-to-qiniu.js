/**
 * 七牛本地文件上传模块，需要node>=7.6
 * @author VenDream
 * @since 2018-9-28
 */

const fs = require('fs');
const path = require('path');
const parse = require('url-parse');
const qiniu = require('qiniu');
const colors = require('colors/safe');
const configFile = path.resolve(__dirname, 'var/static.config.json');

// 读取七牛上传配置
let staticConfig;
let qiniuConfig;
try {
  staticConfig = require(configFile);
  qiniuConfig = staticConfig.qiniu;
} catch (err) {
  die(err);
}
const { cdnPath, distDir } = staticConfig;

// 上传前端静态输出文件到七牛CDN
function uploadToQiniu(dir) {
  // 计数器
  let uploaded = 0;
  // 解析bucket前缀
  const cdnPrefix = parse(cdnPath).pathname.slice(1);
  // 获取所有需要上传文件的本地路径
  const staticDistDir = dir || path.resolve(distDir);
  const files = getAllFiles(staticDistDir);
  logSucc(`[INFO] Found ${files.length} files`);
  // 生成七牛上传配置，参考：https://developer.qiniu.com/kodo/sdk/1289/nodejs#upload-flow
  const mac = new qiniu.auth.digest.Mac(
    qiniuConfig.accessKey,
    qiniuConfig.secretKey
  );
  const options = { scope: qiniuConfig.bucket };
  // 逐个上传
  for (const file of files) {
    const putPolicy = new qiniu.rs.PutPolicy(options);
    const uploadToken = putPolicy.uploadToken(mac);
    const formUploader = new qiniu.form_up.FormUploader();
    const putExtra = new qiniu.form_up.PutExtra();
    // 上传结果处理
    function uploaderHandler(respErr, respBody, respInfo) {
      if (respErr) {
        logErr(respErr.message);
      }
      const { statusCode } = respInfo;
      const cdnFilename = cdnPath + file.name;
      if (+statusCode === 200) {
        uploaded += 1;
        logSucc(`[${uploaded}/${files.length}] ${file.path} => ${cdnFilename}`);
        if (uploaded === files.length) {
          logSucc('[INFO] All files uploaded');
        }
      } else {
        logErr('[ERROR]', statusCode, respBody);
      }
    }
    // 执行上传动作
    formUploader.putFile(
      uploadToken,
      cdnPrefix + file.name,
      file.path,
      putExtra,
      uploaderHandler
    );
  }
}
uploadToQiniu();

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

module.exports = uploadToQiniu;
