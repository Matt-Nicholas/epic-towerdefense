var gulp = require('gulp');


// used for build and clean tasks.
var utilities = require('gulp-util');
var buildProduction = utilities.env.production;
// var del = require('del');

// set up server with watchers and run typescript compiler in the shell.
var browserSync = require('browser-sync').create();
var shell = require('gulp-shell');

var sourcemaps = require('gulp-sourcemaps');

// ////////////////////// SERVER //////////////////////
gulp.task('serve', function() {
  browserSync.init({
    server: {
      baseDir: "./",
      index: "index.html"
    }
  });
  gulp.watch(['resources/js/*.js'], ['htmlBuild']); // vanilla js changes, reload.
  gulp.watch(['*.html'], ['htmlBuild']); // html changes, reload.
});

gulp.task('htmlBuild', function(){
  browserSync.reload();
});
