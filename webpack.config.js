const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const DIST_DIR = path.resolve(__dirname, 'build');
const SRC_DIR = path.resolve(__dirname, 'src');
const STATIC_DIR = path.resolve(__dirname, 'static');

const webpackConfig = {
    devtool: 'source-map',
    entry: ['babel-polyfill', `${SRC_DIR}/index.js`],
    devServer: {
        https: true,
        port: 3004,
        historyApiFallback: true,
        disableHostCheck: true,
    },
    output: {
        filename: 'bundle.js',
        sourceMapFilename: 'bundle.js.map',
        path: DIST_DIR,
        publicPath: '/',
    },
    module: {
        rules: [
            {
                test: /\.jsx?/,
                include: [SRC_DIR],
                loader: 'babel-loader',
            },
            {
                test: /\.css$/,
                use: [
                    { loader: 'style-loader' },
                    { loader: 'css-loader' },
                ],
            },
            { test: /\.(png|woff|woff2|eot|ttf|svg)$/, loader: 'url-loader?limit=100000' },
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            hash: true,
            template: `${SRC_DIR}/index.html`,
            filename: `${DIST_DIR}/index.html`,
        }),
        new CopyWebpackPlugin([
            { from: STATIC_DIR, to: DIST_DIR },
        ]),
    ],
    resolve: {
        extensions: ['.js', '.jsx'],
    },
};

module.exports = webpackConfig;
