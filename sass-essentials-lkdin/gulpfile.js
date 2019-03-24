'use strict';
const { series } = require('gulp'); // To use series functions
const gulp = require('gulp');
const sass = require('gulp-sass');

const browserSync = require('browser-sync').create();

sass.compiler = require('node-sass');

function styles () {
    return gulp.src('./source/sass/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('./dist/css'));
};

function defaultTask(params) {
    console.log('Im working!');
}

function watch() {
    browserSync.init({
      server: {
        baseDir: './',
      },
      browser: 'chrome',
    });
    gulp.watch('./source/sass/*.scss', styles);
    gulp.watch('./*.html').on('change', browserSync.reload);
    gulp.watch('./source/js/*.js').on('change', browserSync.reload);
};

exports.default = defaultTask;
exports.watch = watch;
exports.styles = styles;
