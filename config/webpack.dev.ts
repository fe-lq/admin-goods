import { Configuration } from "webpack";
import { merge } from "webpack-merge";
import commonConfig from "./webpack.common";
import "webpack-dev-server";

const devConfig: Configuration = merge(commonConfig, {
  mode: "development",
  // SourceMap的模式
  devtool: "eval-source-map",
  // 编译信息的展示模式
  stats: "errors-warnings",
  devServer: {
    port: 8091,
    hot: true,
    // 解决history模式访问路径失败的问题
    historyApiFallback: true,
    headers: {
      "Access-Control-Allow-Origin": "*",
    },
  },
});

export default devConfig;
