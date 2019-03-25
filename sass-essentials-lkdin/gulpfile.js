const { series } = require('gulp'); // To use series functions
const gulp = require('gulp');
const sass = require('gulp-sass');
const webp = require('gulp-webp');

const browserSync = require('browser-sync').create();

sass.compiler = require('node-sass');

function styles() {
  return gulp.src('./source/sass/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./dist/css'));
}

function convert() {
  return gulp.src('./source/img/*.jpg')
    .pipe(webp())
    .pipe(gulp.dest('./dist/img'));
}

function defaultTask() {
  // console.log('Im working!');
}

function watch() {
  browserSync.init({
    server: {
      baseDir: './',
    },
    browser: 'chrome',
  });
  gulp.watch('./source/sass/*.scss', styles);
  gulp.watch('./dist/css/*.css').on('change', browserSync.reload);
  gulp.watch('./*.html').on('change', browserSync.reload);
  gulp.watch('./source/js/*.js').on('change', browserSync.reload);
}

exports.default = defaultTask;
exports.watch = watch;
exports.styles = styles;
exports.convert = convert;
