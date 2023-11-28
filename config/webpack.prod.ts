import * as path from "path";
import { Configuration } from "webpack";
import CssMinimizerPlugin from "css-minimizer-webpack-plugin";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import TerserPlugin from "terser-webpack-plugin";
import { merge } from "webpack-merge";
import commonConfig from "./webpack.common";

const prodConfig: Configuration = merge(commonConfig, {
  mode: "production",
  devtool: false,
  output: {
    // build指定的文件夹
    path: path.resolve(__dirname, "../dist"),
    /**
     * 文件名称[name].[contenthash:8].js 编译到dist/js文件夹
     * contenthash:8指会自动生成8位的hash值命名防止js名称冲突且有缓存的作用
     */
    filename: "js/[name].[contenthash:8].js",
    chunkFilename: "js/[name].[contenthash:8].chunk.js",
    assetModuleFilename: "asset/[name].[hash][ext]",
  },
  module: {
    rules: [
      {
        test: /\.(le|c)ss$/,
        use: [
          MiniCssExtractPlugin.loader,
          "css-loader",
          "postcss-loader",
          "less-loader",
        ],
      },
    ],
  },
  optimization: {
    usedExports: true,
    minimize: true,
    minimizer: [
      new TerserPlugin({
        minify: TerserPlugin.esbuildMinify,
      }),
      new CssMinimizerPlugin({
        minify: CssMinimizerPlugin.esbuildMinify,
      }),
    ],
    runtimeChunk: "single",
    splitChunks: {
      chunks: "async",
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: "vendors",
          chunks: "all",
        },
      },
    },
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "css/[name].[contenthash:8].css",
      chunkFilename: "css/[name].[contenthash:8].chunk.css",
    }),
  ],
});

export default prodConfig;
