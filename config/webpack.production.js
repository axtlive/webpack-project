// const UglifyJsPlugin = require("uglifyjs-webpack-plugin");  已经过时  用下面的plugin代替
const path = require("path");
const TerserPlugin = require("terser-webpack-plugin");
const ParallelUglifyPlugin = require("webpack-parallel-uglify-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");

const os = require("os");

module.exports = {
  output: {
    filename: "script/[name].[hash:5].bundles.js", // 打包后的文件名
    path: path.resolve(__dirname, "../dist"), // 打包出来的路径 必须是一个绝对路径
    publicPath: "/",
  },
  // 优化项
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin(), // 压缩JS（类似于uglifyjs-webpack-plugin）
      new OptimizeCSSAssetsPlugin({}), // 压缩CSS为一行
    ],
  },
  // optimization: {
  //   minimizer: [
  //     new UglifyJsPlugin({
  //       // parallel: true, 默认用的是cpu的核心数减1
  //       parallel: os.cpus().length, // 如此可以 用满cpu的核心
  //     }),
  //   ],
  // },
  plugins: [
    new ParallelUglifyPlugin({
      exclude: /\.min\.js$/,
      workerCount: os.cpus().length,
      // uglifyJS: {},
      uglifyES: {
        output: {
          beautify: false,
          comments: false,
        },
        compress: {
          warnings: false,
          drop_console: true,
          collapse_vars: true,
        },
      },
    }),
  ],
};
