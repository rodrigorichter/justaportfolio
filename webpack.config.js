const path = require('path');
const webpack = require('webpack');
const nodeExternals = require('webpack-node-externals')
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HandlebarsPlugin = require("handlebars-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');

module.exports = {
    entry: [
        './app.js',
        './public/stylesheets/style.css'
    ],
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
                test: /\.css$/i,
                use: [MiniCssExtractPlugin.loader, 'css-loader']
            }
            
        ] 
    },
    optimization: {
        minimize: true,
        minimizer: [
          // For webpack@5 you can use the `...` syntax to extend existing minimizers (i.e. `terser-webpack-plugin`), uncomment the next line
          // `...`
          new CssMinimizerPlugin(),
        ],
      },
    plugins: [
        /** Since Webpack 4 */
        new webpack.LoaderOptionsPlugin({
            options: {
              handlebarsLoader: {}
            }
          }),
          new MiniCssExtractPlugin({
          }),
            new HandlebarsPlugin({
              // path to hbs entry file(s). Also supports nested directories if write path.join(process.cwd(), "app", "src", "**", "*.hbs"),
              entry: path.join(process.cwd(), "views", "*.hbs"),
              // output path and filename(s). This should lie within the webpacks output-folder
              // if ommited, the input filepath stripped of its extension will be used
              output: path.join(process.cwd(), "dist", "[name].html"),
              
              onBeforeSetup: function (Handlebars) {},
              onBeforeAddPartials: function (Handlebars, partialsMap) {},
              onBeforeCompile: function (Handlebars, templateContent) {},
              onBeforeRender: function (Handlebars, data, filename) {},
              onBeforeSave: function (Handlebars, resultHtml, filename) {},
              onDone: function (Handlebars, filename) {}
            })
      ]
  };