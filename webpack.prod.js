const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');
const TerserPlugin = require('terser-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = merge(common, {
  mode: 'production',

  // This option controls if and how source maps are generated.
  // Consider using 'source-map' or 'hidden-source-map' for production
  devtool: 'source-map',

  plugins: [
    // CleanWebpackPlugin to clean the build folder
    new CleanWebpackPlugin(),

    // MiniCssExtractPlugin to extract CSS into separate files
    new MiniCssExtractPlugin({
      filename: '[name].[contenthash].css',
    }),
  ],

  optimization: {
    minimizer: [
      // TerserPlugin to minify JavaScript
      new TerserPlugin({
        parallel: true,
      }),

      // CssMinimizerPlugin to optimize and minify CSS
      new CssMinimizerPlugin(),
    ],

    // SplitChunksPlugin configuration, if needed
    splitChunks: {
      chunks: 'all',
    },

    // RuntimeChunk configuration, if needed
    runtimeChunk: 'single',
  },
});