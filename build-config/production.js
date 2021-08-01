const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const defaultConfig = require('./default');

module.exports = {
  ...defaultConfig,
  output: {
    path: path.join(__dirname, '../dist'),
    publicPath: '/',
    filename: 'assets/[name].[fullhash].js',
    chunkFilename: 'assets/[name].[fullhash].js',
  },
  mode: 'production',
  optimization: {
    removeAvailableModules: true,
    splitChunks: {
      minSize: 0,
      chunks: 'all',
    },
  },
  devtool: 'source-map',
  plugins: [
    ...defaultConfig.plugins,
    new CopyWebpackPlugin({
      patterns: [
        {
          from: 'public/**/*',
          force: true,
        },
      ],
    }),
  ],
};
