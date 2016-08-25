'use strict';
import path from 'path';
const BUILD_DIR = path.resolve(__dirname, 'dist');
const APP_DIR = path.resolve(__dirname, 'src');
let config = {
    entry: APP_DIR + '/entry.jsx',
    output: {
        path: BUILD_DIR,
        filename: 'app.bundle.js'
    },
    module: {
        loaders: [
            {
                include: APP_DIR,
                loader: 'babel',
                test: /\.jsx?/
            }
        ]
    }
};
export default config;
