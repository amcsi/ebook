var gulp = require('gulp');

var jshint = require('gulp-jshint');
var sass = require('gulp-sass');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var notify = require('gulp-notify');
var bower = require('gulp-bower');
var react = require('gulp-react');

var paths = {
    scss: 'scss',
    bower_intermediary: 'generated/bower'
};
var globs = {
    jsFiles: 'js/*.js'
};
var isWatching = false;

// Lint Task
gulp.task('lint', function() {
    return gulp.src(globs.jsFiles)
        .pipe(react({harmony: true}))
        .on('error', function (err) {
            console.error('lint: react error');
            notifyError(err);
            this.end();
        })
        .pipe(jshint({esnext: true}))
        .on('error', function (err) {
            console.error('lint: jshint error');
            notifyError(err);
            this.end();
        })
        .pipe(jshint.reporter('default'));
});

gulp.task('bower', function() {
    return bower()
        .pipe(gulp.dest('public/bower'))
});

// Compile Our Sass
gulp.task('sass', function() {
    return gulp.src(paths.scss + '/*.scss')
        .pipe(sass({
            outputStyle: 'compressed',
            sourceComments: 'map',
            includePaths : [
                paths.scss + '/*.scss',
                'bower_components/bootstrap-sass/assets/stylesheets/_bootstrap.scss'
            ],
            onError: function (error) {
                notify({
                    sound: true
                }).write(error);
            }
        }))
        .pipe(gulp.dest('public/css'));
});

// Concatenate & Minify JS
gulp.task('scripts', function() {
    return gulp.src(globs.jsFiles)
        .pipe(concat('all.js'))
        .pipe(react({harmony: true}))
        .on('error', function (err) {
            console.error('scripts: react error');
            this.end();
        })
        .pipe(gulp.dest('public/dist'))
        .pipe(rename('all.min.js'))
        .pipe(uglify())
        .on('error', function (err) {
            console.error('scripts: uglify error');
            notifyError(err);
            this.end();
        })
        .pipe(gulp.dest('public/dist'));
});

// Watch Files For Changes
gulp.task('watch', function() {
    isWatching = true;
    gulp.watch(['bower_components/**/*.js', 'bower_components/**/*.css'], ['lint', 'scripts']);
    gulp.watch('js/**/*.js', ['lint', 'scripts']);
    gulp.watch('scss/*.scss', ['sass']);
});

// Default Task
gulp.task('default', ['bower', 'lint', 'sass', 'scripts']);


/**
 * Use gulp-notify to notify of an error
 */
function notifyError(msg) {
    if (isWatching) {
        notify({
            sound: true
        }).write(msg);
    }
    console.error(msg);
}