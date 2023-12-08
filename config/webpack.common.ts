import * as path from "path";
import { BannerPlugin, Configuration } from "webpack";
import HtmlWebpackPlugin from "html-webpack-plugin";

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
        test: /\.(le|c)ss$/,
        use: ["style-loader", "css-loader", "less-loader"],
      },

      {
        test: /\.[jt]sx?$/,
        include: path.resolve(__dirname, "../src"),
        loader: "ts-loader",
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./index.html",
    }),
    new BannerPlugin({
      banner: "Micro front-end",
    }),
  ],
};

export default commonConfig;
