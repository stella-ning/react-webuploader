'use strict';
import gulp from 'gulp';
import gutil from 'gulp-util';
import webpack from 'webpack';
import WebpackStream from 'webpack-stream';
import WebpackDevServer from 'webpack-dev-server';
import WebpackConfig from './webpack.config.js';

gulp.task('default', () => {
    return gulp
        .src('src/entry.js')
        .pipe(WebpackStream(WebpackConfig))
        .pipe(gulp.dest('dist/'));
});

gulp.task("server", callback => {
    let compiler = webpack(WebpackConfig);
    new WebpackDevServer(compiler, {}).listen(8080, "localhost", err => {
        if (err)
            throw new gutil.PluginError("webpack-dev-server", err);
        gutil.log("[webpack-dev-server]", "http://localhost:8080/webpack-dev-server/index.html");
    });
});
