const path = require("path");
const HTMLWebpackPlugin = require("html-webpack-plugin");
const Manifest = require("webpack-manifest-plugin");
const { merge } = require("webpack-merge");
const webpackConfigDev = require("./webpack/webpack.config.dev");
const webpackConfigProd = require("./webpack/webpack.config.prod");

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

const webpackConfigCommon = {
  context: path.resolve(__dirname, "src"),
  entry: "./index.tsx",
  output: {
    filename: `[name].js`,
    path: path.resolve(__dirname, "public"),
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
  },
  optimization: {
    splitChunks: {
      chunks: 'all',
    },
  },
  plugins: [
    new Manifest(manifestOptions),
    new HTMLWebpackPlugin({
      template: "./index.html",
      minify: {
        collapseWhitespace: false,
      },
    }),
  ],
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

module.exports = () => {
  switch (process.env.NODE_ENV) {
    case 'development':
      return merge([webpackConfigCommon, webpackConfigDev]);
    case 'production':
      return merge(webpackConfigCommon, webpackConfigProd);
    default:
      throw new Error('No matching configuration was found!');
  }
};
