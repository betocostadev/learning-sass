const { series } = require('gulp'); // To use series functions
const gulp = require('gulp');
// Source Maps for SASS CSS Files
const sourceMaps = require('gulp-sourcemaps');
const sass = require('gulp-sass');
const webp = require('gulp-webp');

const browserSync = require('browser-sync').create();

sass.compiler = require('node-sass');

function styles() {
  return gulp.src('./source/sass/*.scss')
  /* Using Sourcemaps - Needs to be used before the css pipe */
    .pipe(sourceMaps.init())
  /* Output style: compressed = Oneline file with no comments
  expanded = better to read, with comments. */
    .pipe(sass({ outputStyle: 'compressed' }).on('error', sass.logError))
  /* Source Map Write, could be to a different folder (sourceMaps.write('./maps')) */
    .pipe(sourceMaps.write('./maps'))
    .pipe(gulp.dest('./dist/css'));
}

function convert() {
  return gulp.src('./source/img/*.jpg')
    .pipe(webp())
    .pipe(gulp.dest('./dist/img'));
}

/* function defaultTask() {
  // console.log('Im working!');
} */

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

exports.default = watch;
exports.styles = styles;
exports.convert = convert;
