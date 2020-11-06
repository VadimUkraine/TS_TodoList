const path = require("path");
const HTMLWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const TerserWebpackPlugin = require("terser-webpack-plugin");
const { BundleAnalyzerPlugin } = require("webpack-bundle-analyzer");
const Manifest = require("webpack-manifest-plugin");
const ServiceWorkerWebpackPlugin = require("serviceworker-webpack-plugin");

const manifestOptions = {
  seed: {
    name: "My TODO PWA",
    short_name: "TODO",
    display: "standalone",
    background_color: "#F4F4F4",
    theme_color: "#F4F4F4",
    orientation: "portrait-primary",
    start_url: "/index.html",
    icons: [
      {
        src: "/images/maskable_icon.png",
        sizes: "144x144",
        type: "image/png",
        purpose: "maskable",
      },
      {
        src: "/images/icon_144.png",
        sizes: "144x144",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/images/icon_512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "any",
      },
    ],
  },
};

const isDev = process.env.NODE_ENV === "development";

const optimization = () => {
  const config = {
    splitChunks: {
      chunks: 'all',
    },
  };

  if (!isDev) {
    config.minimizer = [
      new TerserWebpackPlugin(),
    ];
  }

  return config;
};

const filename = (ext) => (isDev ? `[name].${ext}` : `[name].[hash].${ext}`);

const plugins = () => {
  const base = [
    new ServiceWorkerWebpackPlugin({
      entry: path.join(__dirname, "src/sw.js"),
      filename: "sw.js",
      excludes: ["**/.*", "**/*.map", "*.html"],
    }),
    new Manifest(manifestOptions),
    new HTMLWebpackPlugin({
      template: "./index.html",
      minify: {
        collapseWhitespace: !isDev,
      },
    }),
    new CleanWebpackPlugin(),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, "src/global/img/"),
          to: path.resolve(__dirname, "public/images"),
        },
      ],
    }),
  ];
  if (!isDev) {
    base.push(new BundleAnalyzerPlugin());
  }
  return base;
};

module.exports = {
  context: path.resolve(__dirname, "src"),
  mode: "development",
  entry: "./index.tsx",
  output: {
    filename: filename("js"),
    path: path.resolve(__dirname, "public"),
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
  optimization: optimization(),
  devServer: {
    port: 4200,
    hot: isDev,
  },
  devtool: isDev ? "source-map" : '',
  plugins: plugins(),
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: [{
          loader: "ts-loader",
          options: { transpileOnly: true },
        }],
      },
    ],
  },
};
