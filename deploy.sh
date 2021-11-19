#!/usr/bin/env sh
# 當發生錯誤時終止腳本運行
set -e
# 打包
npm run build
# 移動至到打包後的dist目錄 
cd dist
# 因為dist資料夾預設是被ignore的，因此在進入dist資料夾後初始化git
git init
git add -A
git commit -m "deploy v$1"
# 部署到 git@github.com:<UserName>/<Repository>  分支為 gh-pages
git push -f git@github.com:YUN-CHIEN-LO/vue3-simple-news master:gh-pages
cd -