import path from 'path';
const BUILD_DIR = path.resolve(__dirname, 'dist');
const APP_DIR = path.resolve(__dirname, 'src');
let config = {
    entry: APP_DIR + '/entry.jsx',
    output: {
        path: BUILD_DIR,
        filename: 'app.bundle.js'
    },
    devtool: 'source-map',
    module: {
        loaders: [
            {
                include: APP_DIR,
                loader: 'babel',
                test: /\.jsx$/
            }, {
                loaders: ["style", "css?sourceMap", "sass?sourceMap"],
                test: /\.scss$/
            }
        ]
    }
};
export default config;
