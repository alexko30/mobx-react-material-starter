const path = require('path');
const webpack = require('webpack');

const baseConfig = require('./base');

module.exports = {
  ...baseConfig,
  mode: 'development',
  devServer: {
    hot: true,
    contentBase: baseConfig.context,
    port: 4200,
    host: '0.0.0.0',
    publicPath: '/',
    historyApiFallback: true,
    disableHostCheck: false,
    useLocalIp: true,
  },
  output: {
    path: path.join(__dirname, 'dist'),
    publicPath: '/',
    filename: '[name].js',
  },
  devtool: 'cheap-module-source-map',
  module: {
    rules: [
      ...baseConfig.module.rules,
    ],
  },
  plugins: [
    ...baseConfig.plugins,
    new webpack.HotModuleReplacementPlugin(),
  ]
};