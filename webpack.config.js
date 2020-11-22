const path = require('path');
const webpack = require('webpack');
const nodeExternals = require('webpack-node-externals')
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HandlebarsPlugin = require("handlebars-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
    entry: {
        bundle: './app.js'
    } ,
    output: {
        path: path.resolve(__dirname, './dist')
    },
    node: {
        // Need this when working with express, otherwise the build fails
        __dirname: false,   // if you don't put this is, __dirname
        __filename: false,  // and __filename return blank or /
      },
    externals: [nodeExternals()], // Need this to avoid error when working with Express
    module: {
        rules: [
            { test: /\.hbs$/, loader: "handlebars-loader" },
            {
                test: /\.css$/,
                use: [
                  'style-loader',
                  'css-loader'
                ]
              }
        ] 
    },
    plugins: [
        /** Since Webpack 4 */
        new webpack.LoaderOptionsPlugin({
            options: {
              handlebarsLoader: {}
            }
          }),
          new MiniCssExtractPlugin({
            filename: "[name]-styles.css",
            chunkFilename: "[id].css"
          }),
          new HtmlWebpackPlugin({
            title: "Generic Head Title",
            // the template you want to use
            template: path.join(__dirname, "views", "head.hbs"),
            // the output file name
            filename: path.join(__dirname, "dist", "head.hbs"),
            inject: "head"
          }),
            new HandlebarsPlugin({
              // path to hbs entry file(s). Also supports nested directories if write path.join(process.cwd(), "app", "src", "**", "*.hbs"),
              entry: path.join(process.cwd(), "views", "*.hbs"),
              // output path and filename(s). This should lie within the webpacks output-folder
              // if ommited, the input filepath stripped of its extension will be used
              output: path.join(process.cwd(), "dist", "[name].html"),
              // you can also add a [path] variable, which will emit the files with their relative path, like
              // output: path.join(process.cwd(), "build", [path], "[name].html"),
              partials: [
                path.join(process.cwd(), "app", "views", "partials", "*.hbs")
              ],
              // hooks
              // getTargetFilepath: function (filepath, outputTemplate) {},
              // getPartialId: function (filePath) {}
              onBeforeSetup: function (Handlebars) {},
              onBeforeAddPartials: function (Handlebars, partialsMap) {},
              onBeforeCompile: function (Handlebars, templateContent) {},
              onBeforeRender: function (Handlebars, data, filename) {},
              onBeforeSave: function (Handlebars, resultHtml, filename) {},
              onDone: function (Handlebars, filename) {}
            })
      ]
  };