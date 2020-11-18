const path = require("path");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const TerserWebpackPlugin = require("terser-webpack-plugin");
const { BundleAnalyzerPlugin } = require("webpack-bundle-analyzer");
const ServiceWorkerWebpackPlugin = require("serviceworker-webpack-plugin");

module.exports = {
  output: {
    filename: `[name].[hash].js`,
  },
  optimization: {
    minimizer: [
      new TerserWebpackPlugin(),
    ],
  },
  plugins: [
    new ServiceWorkerWebpackPlugin({
      entry: path.join(__dirname, "../src/sw.js"),
      filename: "sw.js",
      excludes: ["**/.*", "**/*.map", "*.html"],
    }),
    new CleanWebpackPlugin(),
    new BundleAnalyzerPlugin(),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, "../src/global/img/"),
          to: path.resolve(__dirname, "../public/images"),
        },
      ],
    }),
  ],
};
