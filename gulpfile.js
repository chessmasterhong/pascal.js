'use strict';

var gulp = require('gulp'),
    jshint = require('gulp-jshint'),
    shell = require('gulp-shell');

gulp.task('lint', function() {
    return gulp.src('./scripts/**/*.js')
        .pipe(jshint('.jshintrc'))
        .pipe(jshint.reporter(require('jshint-stylish')));
});

gulp.task('docs', function() {
    return gulp.src('./README.md')
        .pipe(shell('jsdoc -c ./jsdoc.conf.json'));
});
