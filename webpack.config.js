const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const DIST_DIR = path.resolve(__dirname, 'build');
const DEMO_DIR = path.resolve(__dirname, 'demo');
const SRC_DIR = path.resolve(__dirname, 'src');
const STATIC_DIR = path.resolve(__dirname, 'static');

const webpackConfig = {
    devtool: 'source-map',
    entry: ['babel-polyfill', `${DEMO_DIR}/index.js`],
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
                include: [DEMO_DIR, SRC_DIR],
                loader: 'babel-loader',
            },
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            hash: true,
            template: `${DEMO_DIR}/index.html`,
            filename: `${DIST_DIR}/index.html`,
        }),
        new CopyWebpackPlugin([
            { from: STATIC_DIR, to: DIST_DIR },
            { from: `${SRC_DIR}/react-turborater.js`, to: DIST_DIR },
        ]),
    ],
    resolve: {
        extensions: ['.js', '.jsx'],
    },
};

module.exports = webpackConfig;
