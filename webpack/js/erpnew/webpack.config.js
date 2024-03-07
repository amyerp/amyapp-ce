const path = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin")

module.exports = {
  entry: {

  //'assets/bundle': [path.resolve(__dirname, "index.js"), path.resolve(__dirname, "index.scss")],
  'test/bundle': [path.resolve(__dirname, "index.js")],
  //'sw': path.resolve(__dirname, "js/sw.js"),
},
  output: {
    path: path.resolve(__dirname, './'),
    filename: '[name].js',
    libraryTarget: 'umd',
  },
  module: {
    rules: [
        {
          test: /\.(scss|css)$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
          loader: 'css-loader',
          options: {
              importLoaders: 2,
            },
        },
        {
          loader: 'resolve-url-loader',
          options: {
            sourceMap: true,
          },
        },
        {
          loader: 'sass-loader',
          options: {
            sourceMap: true,
          },
        },

        ],
      },
      {
  test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
  use: [
    {
      loader: 'file-loader',
      options: {
        name: '[name].[ext]',
        outputPath: 'fonts/'
      }
    }
  ]
},

    ]
 },

 plugins: [
    new MiniCssExtractPlugin({
       cssProcessorOptions: { map: { inline: false, annotation: true, } },
    }),

  ],



};
