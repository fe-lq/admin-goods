# 商品项目

该项目主要是当做微应用接入到admin系统中，也可独立部署运行
主要使用技术栈React + TypeScript + Mobx

## 环境搭建

```bash
  #利用Homebrew安装node
  brew install node
  # 查看版本
  node -v
  # 全局安装pnpm，项目所有依赖由pnpm管理
  npm i -g pnpm
```

## 启动项目

```shell
 # 安装项目依赖
  pnpm i
  # 启用项目
  pnpm start
```

## Tips

Mac安装brew,在终端执行如下命令

```bash
 ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"
#  如有报错raw.githubusercontent.com 可换国内的镜像地址
```

Mac和Window都可以到node[官网](https://nodejs.org/en)下载安装包安装

pnpm下载依赖慢的话可用国内的淘宝镜像

```bash
 npm install -g cnpm --registry=http://registry.npmmirror.com
```

项目开发流程介绍请到`doc`文件夹下
