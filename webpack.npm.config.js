const path = require('path');

const DIST_DIR = path.resolve(__dirname, 'build');
const SRC_DIR = path.resolve(__dirname, 'src');

module.exports = {
    entry: [`${SRC_DIR}/ReactTurboRater.jsx`],
    output: {
        filename: 'ReactTurboRater.jsx',
        path: DIST_DIR,
    },
    module: {
        rules: [
            {
                test: /\.jsx?/,
                include: SRC_DIR,
                loader: 'babel-loader',
            },
        ],
    },
};
