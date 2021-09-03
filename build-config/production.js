const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const baseConfig = require('./base');

module.exports = {
  ...baseConfig,
  output: {
    path: path.join(__dirname, '../dist'),
    publicPath: '/',
    filename: 'assets/[name].[fullhash].js',
    chunkFilename: 'assets/[name].[fullhash].js',
  },
  mode: 'production',
  performance: {
    hints: false,
    maxEntrypointSize: 512000,
    maxAssetSize: 512000
  },
  optimization: {
    removeAvailableModules: true,
    splitChunks: {
      chunks: 'all',
      minSize: 10000,
      maxSize: 250000,
    },
  },
  devtool: 'source-map',
  plugins: [
    ...baseConfig.plugins,
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
