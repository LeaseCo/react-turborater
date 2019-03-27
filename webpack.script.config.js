const path = require('path');

const DIST_DIR = path.resolve(__dirname, 'build');
const SRC_DIR = path.resolve(__dirname, 'src');

module.exports = {
    entry: [`${SRC_DIR}/react-turborater.js`],
    output: {
        filename: 'react-turborater.min.js',
        path: DIST_DIR,
    },
};
