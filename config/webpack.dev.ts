import * as path from "path";
import { Configuration } from "webpack";
import HtmlWebpackPlugin from "html-webpack-plugin";
import "webpack-dev-server";
const isEnvProduction = process.env.NODE_ENV === "production";

const devConfig: Configuration = {
  mode: isEnvProduction ? "production" : "development",
  devtool: isEnvProduction ? false : "source-map",
  entry: path.resolve(__dirname, "../src/index"),
  output: {
    path: path.resolve(__dirname, "../dist"),
    filename: isEnvProduction
      ? "static/js/[name].[contenthash:8].js"
      : "static/js/bundle.js",
    chunkFilename: isEnvProduction
      ? "static/js/[name].[contenthash:8].chunk.js"
      : "static/js/[name].chunk.js",
    assetModuleFilename: "static/media/[name].[hash][ext]",
    publicPath: "/",
  },
  resolve: {
    alias: {
      "@": "src",
    },
    extensions: [".js", ".ts", ".jsx", ".tsx"],
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: "ts-loader",
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./index.html",
    }),
  ],
};

export default devConfig;
