const path = require('path');
module.exports = {
    entry: './index.html',
    output: {
        filename: 'index.bundle.js',
        path: path.resolve(__dirname, './'),
    }
};