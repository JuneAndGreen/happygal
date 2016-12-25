'use strict';

const gulp = require('gulp');
const webpack = require('gulp-webpack');
const webpackConfig = require('./webpack.config.js');
const uglify = require('gulp-uglify');

gulp.task('webpack', () => {
  gulp.src('./src/*.js')
    .pipe(webpack(webpackConfig))
    .pipe(gulp.dest('./dist/'));
});

gulp.task('uglify', ['webpack'], () => {
  gulp.src('./dist/*.js')
    .pipe(uglify())
    .pipe(gulp.dest('./dist/'));
});

gulp.task('html', ['uglify'], () => {
  gulp.src('./src/main.html')
    .pipe(gulp.dest('./dist/'));
});

gulp.task('default', () => {
  gulp.watch('./src/**/*.*', (event) => {
    console.log('******** rebuild ********');
    gulp.run('html');
  });

	gulp.run('html');
});