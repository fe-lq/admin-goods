# AdminGoods

该项目实现从0-1使用React + ReactRouter + Webpack + TypeScript + Eslint + Prettier等工具搭建；
为什么不用React现有的脚手架因为想自己动手编写一个cli工具，虽然在实际开发中也经常会修改或配置一些依赖工具
但从0-1的过程一直没着手实践过，赶着这次想完善一个基于微前端整体项目，就在这个React微应用下实现一下。

本项目会边开发边总结

## 安装依赖

```bash
# 为了使用React语法开发和路由调转页面
pnpm i react react-dom react-router-dom
# 开发环境需要的依赖包，后面会逐一介绍使用
pnpm i -D cross-env eslint husky lint-staged prettier typescript webpack webpack-cli @commitlint/cli @commitlint/config-conventional
```

## 工具依赖包介绍

### husky&lint-staged&commitlint

首先附上官网
[husky](https://typicode.github.io/husky/)
[lint-staged](https://github.com/lint-staged/lint-staged#readme)

```bash
# 在package.json文件中的"scripts"属性加上"prepare"命令
# 为了在pnpm i安装依赖后自动执行husky install启动git钩子
npm pkg set scripts.prepare="husky install"
# 添加git的hooks，下面的命令是添加一个pre-commit hook到.husky文件下
npx husky add .husky/pre-commit
# 添加git的hooks，下面的命令是添加一个commit-msg hook到.husky文件下
npx husky add .husky/commit-msg
```

1. 为什么要配置的命令是`prepare`,为了自动执行参见[解释](https://docs.npmjs.com/cli/v10/using-npm/scripts#prepare-and-prepublish)
2. pre-commit和commit-msg两个hooks的介绍见[git-hooks](https://git-scm.com/book/en/v2/Customizing-Git-Git-Hooks)
3. @commitlint/config-conventional是一个commit规范规则，也可以在commit-msg中用shell语法自定义规则
   或者在.commitlintrc.ts中配置插件自定义规则
4. 测试commit-msg的两种方式(不会有提交commit效果)
   * 使用git commit -m 'xxx'验证在commit-msg最后添加`exit 1`
   * echo 'xxx' | npx commitlint
5. 在pre-commit中配置提交commit之前的校验，一般使用lint-staged如下配置

```bash
# .husky/pre-commit
npx lint-staged
```

```json
// 在package.json中添加如下配置
"lint-staged": {
   // 匹配的文件
   "*.{js,jsx,ts,tsx,less,json}": [
      // eslint修复
      "eslint --fix",
      // prettier格式化
      "prettier --write"
    ]
}
```

### eslint&prettier

学习途径
[eslint](https://eslint.nodejs.cn/docs/latest/use/getting-started)
[prettier](https://prettier.io/docs/en/)
按照文档介绍配置eslint和prettier

### webpack

webpack应该是比较早的打包编译工具，但是现在也出现了比较多的工具可供选择Rollup Vite等
[webpack官网](https://www.webpackjs.com/concepts/)
安装依赖

```bash
pnpm i -D webpack webpack-dev-server webpack-cli
```

传统的配置方式基本都是以webpack.config.js当配置文件，因为编译运行的webpack文件是commonjs模式
如果要使用module模式，package.json中不能配置`"type": "module"`
如果使用webpack.config.ts需要将tsconfig.json配置如下

```json
{
  "compilerOptions": {
    "target": "es5",
   //  主要配置项
    "module": "commonjs",
    "lib": ["ES6", "DOM"],
    "moduleResolution": "node",
    "esModuleInterop": true,
    "skipLibCheck": false,
    "strict": true,
    "baseUrl": "./"
  },
}
```

但是将`"module": "commonjs"`与react项目使用的module模式又不匹配，所以可以单给webpack的配置文件重新定一个ts编译配置
且在package.json中配置TS_NODE_PROJECT环境变量指定tsconfig.json;

```json
{
   "script": {
      "start": "cross-env NODE_ENV=development TS_NODE_PROJECT='./config/tsconfig.json' webpack serve --config  ./config/webpack.dev.ts",
   }
}
```

tip: `cross-env`是为了在不同操作系统中设置环境变量
