/*
const common = require("./webpack.common.js");
const merge = require("webpack-merge");
const ExtractTextPlugin = require("extract-text-webpack-plugin");

//configuracion del plugin extract-text-webpack-plugin
const extractSass = new ExtractTextPlugin({
  //nombre del archivo donde coloca el css procesado
  //[name] dice que se llame igual que como lo nombre
  //[contenthash] nos permite crear un nuevoa archivo
  //cada vez que hay una modificacion
  filename: "dist/css/[name].[contenthash].css",
});

module.exports = merge(common, {
  output: {
    publicPath: ".",
  },
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: extractSass.extract({
          use: [
            { loader: "css-loader", options: { minimize: true } },
            { loader: "sass-loader" },
          ],
        }),
      },
      {
        test: /\.html$/,
        use: [
          { loader: "html-loader", options: { minimize: true, attrs: false } },
        ],
      },
    ],
  },
  plugins: [extractSass],
});

*/

const common = require("./webpack.common.js");
const merge = require("webpack-merge");

const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCssAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const TerserJS = require("terser-webpack-plugin");

module.exports = merge(common, {
  plugins: [
    new MiniCssExtractPlugin({
      filename: "dist/css/[name].[contenthash].css",
    }),
  ],
  optimization: {
    minimizer: [new TerserJS(), new OptimizeCssAssetsPlugin({})],
  },
  output: {
    publicPath: ".",
  },
  module: {
    rules: [
      {
        test: /.scss$/,
        use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"],
      },
      {
        test: /.html$/,
        use: {
          loader: "html-loader",
          options: { minimize: true, attributes: false },
        },
      },
    ],
  },
});
