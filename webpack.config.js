const path = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin")




module.exports = {
  entry: {

  'bundle': [path.resolve(__dirname, "webpack/index.js"), path.resolve(__dirname, "webpack/index.scss")],
  //'sw': path.resolve(__dirname, "js/sw.js"),
},
  output: {
    path: path.resolve(__dirname, 'static/'),
    filename: 'assets/[name].js',
    libraryTarget: 'umd',
  },

optimization: {
runtimeChunk: 'single',
 splitChunks: {
  cacheGroups: {
    // match the entry point and spit out the file named here
    vendor: {
      chunks: 'all',
      name: 'vendor',
      test: /[\\/]node_modules[\\/]/,
      enforce: true,
    },
  },
 },
},

  module: {
    rules: [
      /*
      {
       test: /\.worker\.js$/,
       use: { loader: "worker-loader" },
     },
     */
    
        {
          test: /\.(scss|css)$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
          loader: 'css-loader',
          options: {
              importLoaders: 2,
              url: false,
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
        outputPath: 'assets/fonts/'
      }
    }
  ]
},

    ]
 },

 plugins: [
    new MiniCssExtractPlugin({
       cssProcessorOptions: { map: { inline: false, annotation: true, } },
       filename: "assets/[name].css",
    }),

  ],

devtool: 'eval-source-map'



};
