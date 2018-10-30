#!/bin/bash

# 参考: https://askubuntu.com/questions/1705/how-can-i-create-a-select-menu-in-a-shell-script
PS3="Please select a upload service: "
options=("阿里云OSS" "七牛")
select opt in "${options[@]}"
do
  case $opt in
    "阿里云OSS")
      node upload-to-aliyun.js
      break
      ;;
    "七牛")
      node upload-to-qiniu.js
      break
      ;;
    *) echo "Invalid option. Try another one.";;
  esac
done