const path = require('path');
const webpack = require('webpack');

const defaultConfig = require('./default');

module.exports = {
  ...defaultConfig,
  entry: {
    polyfill: './src/polyfill',
    main: './src/index.tsx',
  },
  mode: 'development',
  devServer: {
    hot: true,
    contentBase: defaultConfig.context,
    port: 3000,
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
      ...defaultConfig.module.rules,
    ],
  },
  plugins: [
    ...defaultConfig.plugins,
    new webpack.HotModuleReplacementPlugin(),
  ]
};