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

const cssLoader = (extra) =>{
  const loaders = [
    {
      loader: MiniCssExtractPlugin.loader,
      options: {
        hmr: isDev,
        reloadAll: true,
      },
    }, 'css-loader', 
  ]

  if(extra){
    loaders.push(extra)
  }

  return loaders
}

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
    extensions:['.js', '.json', '.png', '.ts', '.tsx'],
    alias:{
      '@': path.resolve(__dirname, 'src')
    }
  },
  optimization: optimization(),
  devServer:{
    port: 4200,
    hot: isDev,
    contentBase: 'public',
  },
  devtool: isDev ? 'source-map' : '',
  plugins: plugins(),
  module:{
    rules:[
      {
        test:/\.css$/,
        use: cssLoader(), 
      },
      {
        test: /\.(png|jpg|svg|gif)$/,
        use:['file-loader']
      },
      {
        test: /\.(ttf|woff|woff2|eot)$/,
        use: ['file-loader']
      },{
        test: /\.xml$/,
        use: ['xml-loader']
      },
      {
        test: /\.csv$/,
        use: ['csv-loader']
      },
      {
        test:/\.s[ac]ss$/,
        use:cssLoader('sass-loader'),
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
        enforce: 'pre',
      },
      { 
        test: /\.tsx$/, 
        exclude: /node_modules/, 
        loader: 'ts-loader',
        enforce: 'pre',
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