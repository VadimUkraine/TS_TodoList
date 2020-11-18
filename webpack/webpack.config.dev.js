module.exports = {
  optimization:{
    splitChunks: {
      chunks: 'all',
    },
  },
  devServer: {
    port: 4200,
    hot: true,
  },
  devtool: 'source-map',
};
