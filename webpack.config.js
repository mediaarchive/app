/*
 * @Author: Artur Atnagulov (ClienDDev team)
 */

var path = require('path')
var webpack = require('webpack')

module.exports = {
	context: path.normalize(__dirname + '/public/js'),
    devtool: 'cheap-module-eval-source-map',
    entry: [
        'babel-polyfill',
        './js/index.jsx'
    ],
    output: {
        path: path.join(__dirname, '/public/'),
        publicPath: '/',
        filename: path.normalize(__dirname + './public/dist/src.min.js')
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
                include: [
                    path.resolve(__dirname, "/public/js"),
                ],
                loaders: ['react-hot', 'babel-loader'],
                plugins: ['transform-runtime', 'transform-decorators-legacy'],
            }
        ]
    }
}