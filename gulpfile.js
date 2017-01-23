'use strict';

const gulp = require('gulp');
const webpack = require('gulp-webpack');
const webpackConfig = require('./webpack.config.js');
const uglify = require('gulp-uglify');
const Hala = require('hala');

// webpack
gulp.task('webpack', () => {
  gulp.src('./src/*.js')
    .pipe(webpack(webpackConfig))
    .pipe(gulp.dest('./dist/'));
});

// 压缩
gulp.task('uglify', ['webpack'], () => {
  gulp.src('./dist/*.js')
    .pipe(uglify())
    .pipe(gulp.dest('./dist/'));
});

// 主页面迁移
gulp.task('html', ['uglify'], () => {
  gulp.src('./src/main.html')
    .pipe(gulp.dest('./dist/'));
});

// 监听变化
gulp.task('watch', () => {
  gulp.watch('./src/**/*.*', ['html']);
});

// 开启本地服务器
gulp.task('server', ['watch', 'html'], () => {
  new Hala({
    port: 8088,
    launch: true,
    webroot: './'
  });
});

gulp.task('default', ['server']);