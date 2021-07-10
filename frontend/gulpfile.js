'use strict';

const gulp = require('gulp');
var exec = require('child_process').exec;

const webpack = require('webpack');
const webpackConfig = require('./webpack.config.js');

gulp.task('build-js', function (callback) {
  webpack(webpackConfig, function (err, stats) {
    if (err) throw err;
    console.log(stats.toString());
    callback();
  });
});

gulp.task('build-css', function (callback) {
  exec('npm run build:css', function (err, stdout, stderr) {
    console.log(stdout);
    console.log(stderr);
    callback(err);
  });
});

gulp.task('default', gulp.series('build-js', 'build-css'));