'use strict';

var gulp = require('gulp'),
    shell = require('gulp-shell');


gulp.task('docs', function() {
    return gulp.src('./README.md')
        .pipe(shell('jsdoc -c ./jsdoc.conf.json'));
});
