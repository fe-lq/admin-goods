import { Configuration } from "webpack";
import { merge } from "webpack-merge";
import commonConfig from "./webpack.common";
import "webpack-dev-server";

const devConfig: Configuration = merge(commonConfig, {
  mode: "development",
  // SourceMap的模式
  devtool: "inline-source-map",
  devServer: {
    port: 8091,
    hot: true,
    historyApiFallback: true,
    headers: {
      "Access-Control-Allow-Origin": "*",
    },
  },
});

export default devConfig;
