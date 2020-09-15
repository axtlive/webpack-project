const path = require("path");
const setIterm2Badge = require("set-iterm2-badge");
const setTitle = require("node-bash-title");
setIterm2Badge("🐂🍻Webpack");
setTitle("🐂🍻webpack");

module.exports = {
  // 出口
  output: {
    filename: "script/[name].bundle.js", // 打包后的文件名
    path: path.resolve(__dirname, "../dist"), // 打包出来的路径 必须是一个绝对路径
  },
  // source-map 调试
  devtool: "source-map",
  // 监控实时编译
  watch: false,
  // 监控的属性设置
  watchOptions: {
    poll: 1000, // 多少秒监控一次
    aggregateTimeout: 500, //防抖
    ignored: /node_modules/, // 不需要监控的文件夹
  },
};
