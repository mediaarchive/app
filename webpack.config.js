/*
 * @Author: Artur Atnagulov (ClienDDev team)
 */

var path = require('path')
var webpack = require('webpack')
var NpmInstallPlugin = require('npm-install-webpack-plugin')

module.exports = {
	context: path.normalize(__dirname + '/public/js/'),
    devtool: 'cheap-module-eval-source-map',
    entry: [
        'babel-polyfill',
        './index'
    ],
    output: {
        path: path.join(__dirname, '/public/dist'),
        filename: 'src.min.js',
        publicPath: '/public/'
    },
    plugins: [
        new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.HotModuleReplacementPlugin()
    ],
    module: {
        // preLoaders: [{
        //     test: /\.js$/,
        //     loaders: ['eslint'],
        //     include: [
        //         path.resolve(__dirname, "public/js"),
        //     ],
        // }],
        loaders: [{
            loaders: ['react-hot', 'babel-loader'],
            include: [
                path.resolve(__dirname, "/public/js"),
            ],
            test: /\.js$/,
            // plugins: ['transform-runtime'],
        }]
    }
}