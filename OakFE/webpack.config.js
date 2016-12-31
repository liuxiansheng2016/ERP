var path = require("path");
var webpack = require('webpack');
var BundleTracker = require("webpack-bundle-tracker");
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var uglifyJsPlugin = webpack.optimize.UglifyJsPlugin;
module.exports ={
    entry: {
        index: "./components/js/app.js",
    },
    output: {
        path: './assets/bundles/',
        filename: "index.js"
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                loader: 'babel-loader',
                query: {
                    presets: ['es2015', 'react', 'stage-0'],
                    plugins: ['transform-object-rest-spread']
                }
            },
            {
                test: /\.less$/,
                loader: ExtractTextPlugin.extract("css!less")
            },
            {
                test: /\.(ttf|eot|svg|woff(2)?)(\?[a-z0-9]+)?$/,
                loader: 'file-loader',
            },
             {
                test: /\.(png|jpg)$/,
                 loader: 'url-loader?limit=8192'
             }
        ]
    },

    plugins: [
        new BundleTracker({filename: './webpack-stats.json'}),
        new ExtractTextPlugin("[name].css"),
        new webpack.DefinePlugin({
          'process.env': {
            NODE_ENV: JSON.stringify('production')
          }
         }),
        new webpack.optimize.UglifyJsPlugin()
        ]
};
