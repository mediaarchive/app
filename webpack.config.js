/*
 * @Author: Artur Atnagulov (ClienDDev team)
 */

var path = require('path')
var webpack = require('webpack')

module.exports = {
	context: path.join(__dirname, 'public/js'),
    devtool: 'cheap-module-eval-source-map',
    entry: [
        'babel-polyfill',
        './index.jsx'
    ],
    output: {
        path: path.join(__dirname, 'public'),
        publicPath: '/',
        filename: './dist/src.min.js'
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
        loaders: [
            {
                test: /\.jsx$/,
                exclude: /\/node_modules\//,
                include: [
                    path.resolve(__dirname, "public/js"),
                ],
                loaders: ['react-hot', 'babel-loader'],
                plugins: ['transform-runtime'],
            },
            {
                test: /\.js$/,
                exclude: /\/node_modules\//,
                include: [
                    path.resolve(__dirname, "public/js"),
                ],
                loaders: ['babel-loader'],
                plugins: ['transform-runtime'],
            }
        ]
    }
}