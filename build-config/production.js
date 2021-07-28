const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const defaultConfig = require('./default');

module.exports = {
  ...defaultConfig,
  entry: {
    polyfill: './src/polyfill',
    app: './src/index.tsx',
  },
  output: {
    path: path.join(__dirname, '../dist'),
    publicPath: '/',
    filename: 'assets/[name].[hash].js',
    chunkFilename: 'assets/[name].[hash].js',
  },
  mode: 'production',
  // TODO Chunks
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
