const webpack = require('webpack');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const BrowserSyncPlugin = require('browser-sync-webpack-plugin');
//const UglifyJSPlugin = require('uglifyjs-webpack-plugin');

const extractCSS = new ExtractTextPlugin({
  filename: "css/styles.css",
  allChunks: true
});

const IS_PROD = (process.env.NODE_ENV === 'production');

module.exports = {
  entry: {
    'index' : './src/app.js'
  },
  output: {
    path: './dist',
    filename: '[name].js',
  },
  resolve: {
    modules: [ 'node_modules', 'src' ],
    extensions: [".js", ".scss", ".css", ".html"]
  },
  module: {
    rules: [
      {
        test: /\.(js)$/,
        exclude: [/node_modules/],
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['es2015', 'react'],
            comments: false,
          }
        }
      }, {
        test: /(\.scss|\.css)$/,
        use: extractCSS.extract([
          {
            loader: "css-loader"
          }, {
            loader: "sass-loader"
          }
        ])
      }
    ]
  },
  plugins: [
    new BrowserSyncPlugin({
      // browse to http://localhost:3000/ during development,
      // ./public directory is being served
      host: 'localhost',
      port: 3000,
      server: {
        baseDir: ['./']
      }
    }),
    new webpack.DefinePlugin({
      PRODUCTION: JSON.stringify(IS_PROD)
    }),
    extractCSS,
    //IS_PROD ? new UglifyJSPlugin() : () => {}
  ],
  devtool: "source-map"
};