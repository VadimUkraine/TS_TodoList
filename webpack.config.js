const path = require('path')
const HTMLWebpackPlugin = require('html-webpack-plugin')
const {CleanWebpackPlugin} = require('clean-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin')
const TerserWebpackPlugin = require('terser-webpack-plugin')
const {BundleAnalyzerPlugin} = require('webpack-bundle-analyzer')

const isDev = process.env.NODE_ENV === 'development'

const optimization = () =>{
  const config =   {
      splitChunks:{
      chunks: 'all'
    }
  }

  if(!isDev){
    config.minimizer = [
      new OptimizeCssAssetsWebpackPlugin(),
      new TerserWebpackPlugin(),
    ]
  }

  return config
}

const filename = ext => isDev ? `[name].${ext}` : `[name].[hash].${ext}` 

const babelOptions =(preset) =>{

  const opts = {
    presets:[
      '@babel/preset-env',
    ]
  }

  if(preset){
    opts.presets.push(preset)
  }

  return opts
}

const jsLoaders = () =>{

  const loaders = [{
    loader: 'babel-loader',
    options: babelOptions(),
  }]

  if(isDev){
    loaders.push('eslint-loader')
  }

  return  loaders
}

const plugins = () =>{
  const base = [
    new HTMLWebpackPlugin({
      template: './index.html',
      minify:{
        collapseWhitespace: !isDev,
      }
    }),
    new CleanWebpackPlugin(),
    new CopyWebpackPlugin({
      patterns: [
      {
        from: path.resolve(__dirname, 'src/global/img/cam.ico'),
        to: path.resolve(__dirname, 'public'),
      }
    ]}),
    new MiniCssExtractPlugin({
      filename: filename('css'),
    })
  ]

  if(!isDev){
    base.push(new BundleAnalyzerPlugin())
  }

  return base;
}

module.exports = {
  context: path.resolve(__dirname, 'src'),
  mode: 'development',
  entry: './index.tsx',
  output: {
    filename: filename('js'),
    path: path.resolve(__dirname, 'public')
  },
  resolve:{
    extensions:['.js', '.json', '.ts', '.tsx'],
    alias:{
      '@': path.resolve(__dirname, 'src')
    }
  },
  optimization: optimization(),
  devServer:{
    port: 4200,
    hot: isDev,
  },
  devtool: isDev ? 'source-map' : '',
  plugins: plugins(),
  module:{
    rules:[
      {
        test:/\.css$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              hmr: isDev,
              reloadAll: true,
            },
          }, 'css-loader', 
        ], 
      },
      { 
        test: /\.js$/, 
        exclude: /node_modules/, 
        use: jsLoaders(),
      },
      { 
        test: /\.ts$/, 
        exclude: /node_modules/, 
        loader: 'ts-loader',
      },
      { 
        test: /\.tsx$/, 
        exclude: /node_modules/, 
        loader: 'ts-loader',
      },
      { 
        test: /\.jsx$/, 
        exclude: /node_modules/, 
        loader:{
          loader: 'babel-loader',
          options: babelOptions('@babel/preset-react'),
        } 
      },
    ]
  }
}