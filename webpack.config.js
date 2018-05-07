const HtmlWebPackPlugin = require('html-webpack-plugin');
const path = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const WebpackMd5Hash = require('webpack-md5-hash');
const CleanWebpackPlugin = require('clean-webpack-plugin');

const ROOT_DIR = path.resolve(__dirname, './');
const SRC_DIR = path.resolve(ROOT_DIR, 'src');
const DIST_DIR = path.resolve(ROOT_DIR, 'dist');

module.exports = {
  mode: 'development',
  entry: {
    main: path.resolve(SRC_DIR, 'index.js'),
  },
  output: {
    path: DIST_DIR,
    filename: '[name].[chunkhash].js',
  },
  module: {
    rules: [
      // {
      //   test: /\.(ts|tsx)$/,
      //   use: 'ts-loader',
      //   exclude: /node_modules/,
      // },
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        }
      },
      // {
      //   test: /\.css$/,
      //   use: ExtractTextPlugin.extract({
      //     fallback: 'style-loader',
      //     use: ['css-loader'],
      //   })
      // },
      {
        test: /\.scss$/,
        use: [
          {
            loader: 'style-loader',
          },
          {
            loader: MiniCssExtractPlugin.loader,
          },
          {
            loader: 'css-loader',
          },
          {
            loader: 'sass-loader',
          },
        ]
      },
      // {
      //   test: /\.html$/,
      //   use: {
      //     loader: 'html-loader',
      //     options: {
      //       minimize: false
      //     },
      //   }
      // }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(DIST_DIR, {
      root: DIST_DIR,
      verbose: true,
      dry: false,
    }),
    new HtmlWebPackPlugin({
      inject: true,
      hash: true,
      template: './src/index.html',
      filename: './index.html',
      path: DIST_DIR,
    }),
    // new ExtractTextPlugin({
    //   filename: 'style.[chunkhash].css',
    //   disable: false,
    //   allChunks: true,
    // }),
    new MiniCssExtractPlugin({
      filename: 'style.[contenthash].css',
    }),
    new WebpackMd5Hash(),
  ],
  devServer: {
    stats: {
      warnings: false,
      colors: true,
    },
    host: process.env.HOST, // defaults to `localhost`
    port: process.env.PORT, // defaults to `8080`
    open: true, // open the page in browser
    overlay: true, // capture compilation related warnings and errors
    historyApiFallback: true,
    contentBase: './',
    // watchOptions: {
    //   aggregateTimeout: 300, // delay the build after the first change
    //   poll: 1000, // poll using interval in ms
    // }
  },

  // entry: ['./src/index.js'],
  // output: {
  //   path: __dirname,
  //   publicPath: '/',
  //   filename: 'bundle.js'
  // },
  // module: {
  //   loaders: [
  //     {
  //       exclude: /node_modules/,
  //       loader: 'babel',
  //       query: {
  //         presets: ['react', 'es2015', 'stage-1']
  //       }
  //     }
  //   ]
  // },
  // resolve: {
  //   extensions: ['', '.js', '.jsx']
  // },
};
