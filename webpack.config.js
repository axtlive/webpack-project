const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const ManifestPlugin = require("webpack-manifest-plugin");
const argv = require("yargs-parser")(process.argv.slice(2));
// const { CheckerPlugin } = require("awesome-typescript-loader");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const ProgressBarPlugin = require("progress-bar-webpack-plugin");
const SpeedMeasurePlugin = require("speed-measure-webpack-plugin");
const WebpackBuildNotifierPlugin = require("webpack-build-notifier");
const FriendlyErrorsPlugin = require("friendly-errors-webpack-plugin");
const WebpackDeepScopeAnalysisPlugin = require("webpack-deep-scope-plugin")
  .default;
const _mode = argv.mode || "development";
const { merge } = require("webpack-merge");
const _modeFlag = _mode === "production";
const _mergeConfig = require(`./config/webpack.${_mode}.js`);

const smp = new SpeedMeasurePlugin();

const Copyright =
  "The Code \nCopyright(c) 2020 Axtlive\nCopyright(c) axtlive@qq.com\nSELF Licensed";

const webpackConfig = {
  entry: "./src/index.js", // 入口
  // 开发服务器
  devServer: {
    // 代理  将打到devServer（`${port}`）端口的服务代理到 `${target}`去
    proxy: {
      "/api": {
        target: "http://localhost:3000/api",
        changeOrigin: true,
        pathRewrite: { "^/api": "" },
      },
    },
    // 使用devServer自带的express服务mock数据   钩子函数
    before(app) {
      app.get("/api/user", (req, res) => {
        res.json({ name: "axtlive" });
      });
    },
    port: 8080,
    progress: true,
    // open: true,
    contentBase: "./dist",
    compress: true,
    historyApiFallback: true,
    quiet: true,
    // hot: true,
  },
  resolve: {
    // modules: [path.resolve("./node_modules")], // 只去当前目录下的node_modules找依赖
    extensions: [".js", ".jsx", ".ts", ".tsx", ".vue", ".css", ".json"], // 不加后缀引入时 去匹配该文件名的后缀的文件
  },
  // 优化项
  optimization: {
    splitChunks: {
      cacheGroups: {
        commons: {
          chunks: "initial",
          name: "common",
          minChunks: 1,
          maxInitialRequests: 5,
          minSize: 0,
        },
      },
    },
    runtimeChunk: {
      name: "runtime",
    },
  },
  // 模块
  module: {
    // 规则
    rules: [
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, "css-loader", "postcss-loader"],
      },
      {
        test: /\.less$/,
        use: [
          MiniCssExtractPlugin.loader,
          "css-loader",
          "postcss-loader", // 用这个loader 来添加各个浏览器前缀的css  (`npm i autoprefixer postcss-loader -D`)
          "less-loader",
        ],
      },
      {
        test: /\.js$/,
        use: [
          {
            loader: "babel-loader",
            options: {
              presets: ["@babel/preset-env"],
              plugins: [
                ["@babel/plugin-proposal-decorators", { legacy: true }],
                ["@babel/plugin-proposal-class-properties", { loose: true }],
                "@babel/plugin-transform-runtime",
              ],
            },
          },
        ],
        include: path.resolve(__dirname, "src"), // 只包括src下的js
        exclude: "/node_modules", // 排除node_modules里面的js
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        use: [
          {
            loader: "file-loader",
            options: {
              esModule: false, // 此行用于解决html-withimg-loader和html-webpack-plugin 发生的冲突
              name: "[name].[ext]",
              outputPath: "assets",
              publicPath: "http://localhost:8080/assets",
            },
          },
        ],
      },
      {
        test: /\.(html|htm)$/,
        use: "html-withimg-loader",
      },
      // 暴露全局
      // {
      //   test: require.resolve("lodash"),
      //   use: [
      //     {
      //       loader: "expose-loader",
      //       options: {
      //         exposes: [
      //           "lodash.map|map",
      //           {
      //             globalName: "lodash.reduce",
      //             moduleLocalName: "reduce",
      //           },
      //         ],
      //       },
      //     },
      //   ],
      // },

      // 配置eslint
      {
        test: /\.js$/,
        use: [
          {
            loader: "eslint-loader",
            options: {
              enforce: "pre",
            },
          },
        ],
        include: path.resolve(__dirname, "src"), // 只包括src下的js
        exclude: "/node_modules", // 排除node_modules里面的js
      },
    ],
  },
  // 插件
  plugins: [
    // js 深度 true shaking
    new WebpackDeepScopeAnalysisPlugin(),
    // 将目录下的index.html当作模板打包到dist下，然后自动引入对应的js
    new HtmlWebpackPlugin({
      template: "./src/index.html", // 模板
      filename: "index.html", // 打包出来的文件名
      // 更多的压缩配置
      minify: {
        // removeAttributeQuotes: true, // 删除双引号
        collapseWhitespace: true, // 折叠空行
      },
      hash: true, // 给插入到html中的js、css 加上哈希戳
      loading: "加载中",
      title: "webpack demo",
    }),
    // 单独抽离css文件
    new MiniCssExtractPlugin({
      filename: _modeFlag ? "styles/[name].[hash:5].css" : "styles/[name].css",
      chunkFilename: _modeFlag ? "style/[id].[hash:5].css" : "style/[id].css",
    }),
    // 清除dist
    new CleanWebpackPlugin(),
    // 进度条
    new ProgressBarPlugin(),
    // 系统提示
    new WebpackBuildNotifierPlugin({
      title: "朱同学的Webpack",
      // logo: path.resolve("./img/favicon.png"),
      suppressSuccess: true,
    }),
    new FriendlyErrorsPlugin({
      compilationSuccessInfo: {
        messages: ["You application is running at http://localhost:8080"],
        notes: [
          "Note that the development build is not optimized",
          "To create a production build, please use npm run build",
        ],
      },
      clearConsole: true,
      onErrors: function(severity, errors) {
        // You can listen to errors transformed and prioritized by the plugin
        // severity can be 'error' or 'warning'
      },
    }),
    // 将某一文件夹(`${from}`)全部拷贝到打包后的文件夹里(`dist/${to}`)
    new CopyWebpackPlugin({
      patterns: [{ from: "./docs", to: "./doc" }],
    }),
    // 缓存更新
    new ManifestPlugin(),
    // 版权声明 在打包出的文件顶部会加上里面的这段注释
    new webpack.BannerPlugin(Copyright),
    // 用webpack.ProvidePlugin 在每个模块中都注入lodash
    new webpack.ProvidePlugin({
      lodash: "lodash",
    }),
    // 定义插件
    new webpack.DefinePlugin({
      DEV: JSON.stringify("development"),
    }),
  ],
  // externals: {
  //   lodash: "lodash",
  // },
};

// smp.wrap() 分析各个loader和plugin所用的时间
// module.exports = smp.wrap(merge(_mergeConfig, webpackConfig));
module.exports = merge(_mergeConfig, webpackConfig);
