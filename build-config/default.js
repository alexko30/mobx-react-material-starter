const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const TSconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
const CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const appDir = path.resolve(__dirname, '../');

const isProduction = process.env.NODE_ENV === 'production';

module.exports = {
  target: ['web', 'es5'],
  entry: './src/index.tsx',
  context: appDir,
  resolve: {
    modules: [path.resolve(appDir, 'node_modules')],
    extensions: ['.mjs', '.js', '.jsx', '.ts', '.tsx', '.json'],
    plugins: [new TSconfigPathsPlugin({ configFile: path.resolve(__dirname, '../tsconfig.json') })]
  },
  module: {
    rules: [
      {
        test: /\.(t)sx?$/,
        loader: 'ts-loader',
        exclude: /(node_modules|service-worker)/,
        options: {
          reportFiles: ['src/**/*.{ts,tsx}'],
          useCaseSensitiveFileNames: true,
        }
      },
      {
        test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        use: 'url-loader?limit=10000&mimetype=application/font-woff',
      },
      {
        test: /\.(ttf|eot|otf)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        use: 'file-loader',
      },
      {
        test: /\.(png|jp(e*)g|jp2|webp|jxr|svg)$/,
        use: 'file-loader',
      },
      {
        test: /\.(s[ac]ss|css)$/i,
        use: [MiniCssExtractPlugin.loader, 'css-loader'],
      },
    ],
  },
  plugins: [
    new webpack.ProvidePlugin({
      React: 'react',
    }),
    new MiniCssExtractPlugin(),
    new CaseSensitivePathsPlugin(),
    new webpack.ContextReplacementPlugin(/moment[\/\\]locale$/, /en/),
    new webpack.ContextReplacementPlugin(/validatorjs\/src[\/\\]lang$/, /en/),
    new webpack.DefinePlugin({
      IS_PRODUCTION: JSON.stringify(isProduction),
    }),
    new HtmlWebpackPlugin({ hash: false, template: './index.hbs', inject: true }),
  ],
};


