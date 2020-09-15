`ps gx | grep"node"`

## webpack 安装

- 安装本地的 webpack
- webpack webpack-cli -D

## webpack 可以进行 0 配置

- 打包工具 -> 输出后的结果（js 模块）
- 打包（支持我们呢的 js 的模块化）

## 手动配置 webpack

- 默认配置文件的名字 webpack.confg.js


## loader

- css-loader 是用来支持 @import 这种语法的
- style-loader 它是把 css 插入到head标签中
- loader的特点:希望单一,用法:字符串即只用一个loader，多个loader 需要用数组
- loader的顺序 默认是从右向左执行；还可以写成对象的形式  
- {loader: - - - -css-loader',options: {}}


## devtool

- 1. 源码映射, 会单独生成一个source-map文件，会标识哪一行哪一列 出错了
> devtool: "source-map",
- 2.不会产生单独的文件，但是可以显示哪一行哪一列 出错了
> devtool: "eval-source-map",
- 3.不标识哪一行哪一列出错，但是会生成一个单独的映射文件
> devtool: "cheap-module-source-map",
- 4. 不会产生单独的文件， 会集成在打包的文件中 ，不会标识哪一列报错
> devtool: "cheap-module-eval-source-map",