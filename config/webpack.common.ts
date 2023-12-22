import * as path from "path";
import { BannerPlugin, Configuration, DefinePlugin } from "webpack";
import HtmlWebpackPlugin from "html-webpack-plugin";
import WebpackBar from "webpackbar";
import dotenv from "dotenv";

// 配置文件路径
const envConfig: Record<string, string> = {
  development: path.resolve(__dirname, "../.env"),
  production: path.resolve(__dirname, "../.env.production"),
};

dotenv.config({
  path: envConfig[process.env.NODE_ENV as string],
}).parsed;

const commonConfig: Configuration = {
  // 入口
  entry: path.resolve(__dirname, "../src/index"),
  // 出口
  output: {
    // build指定的文件夹
    path: path.resolve(__dirname, "../dist"),
    filename: "js/bundle.js",
    chunkFilename: "js/[name].chunk.js",
    publicPath: "/",
    // 每次build自动删除之前的编译结果
    clean: true,
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "../src"),
    },
    extensions: [".js", ".ts", ".jsx", ".tsx"],
  },
  module: {
    rules: [
      {
        // 匹配.less文件
        test: /\.(le|c)ss$/,
        // 排除node_modules文件夹
        exclude: /node_modules/,
        // 匹配src文件夹
        include: /src/,
        // 加载样式加载器
        use: ["style-loader", "css-loader", "postcss-loader", "less-loader"],
      },

      {
        // 匹配.tsx文件
        test: /\.[jt]sx?$/,
        // 匹配src文件夹
        include: path.resolve(__dirname, "../src"),
        // 加载esbuild-loader
        loader: "esbuild-loader",
      },
    ],
  },
  plugins: [
    // 加载html模板
    new HtmlWebpackPlugin({
      template: "./index.html",
    }),
    // 添加banner
    new BannerPlugin({
      banner: "Micro front-end",
    }),
    // 添加进度条
    new WebpackBar(),
    new DefinePlugin({
      "process.env.BASE_URL": JSON.stringify(process.env.BASE_URL),
    }),
  ],
};

export default commonConfig;
