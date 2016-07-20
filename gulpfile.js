var gulp         = require('gulp'),
    concat       = require('gulp-concat'),
    header       = require('gulp-header'),
    uglify       = require('gulp-uglify'),
    sass         = require('gulp-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    cssmin       = require('gulp-cssmin'),
    sourcemaps   = require('gulp-sourcemaps'),
    html2js      = require('gulp-html2js'),
    pkg          = require('./package.json'),
    banner       = [
        '/**',
        ' ** <%= pkg.name %> - <%= pkg.description %>',
        ' ** @author <%= pkg.author %>',
        ' ** @version v<%= pkg.version %>',
        ' **/'
    ].join("\n");

var JS         = [
    'bower_components/twilio-common/dist/twilio-common.js',
    'bower_components/twilio-conversations/dist/twilio-conversations.js',

    'bower_components/jquery/dist/jquery.js',
    "bower_components/momentjs/moment.js",
    "bower_components/lodash/dist/lodash.js",
    "bower_components/cookies-js/src/cookies.js",
    'bower_components/url-to/url-to.js',
    // angular
    "bower_components/angular/angular.js",
    // "bower_components/angular-ui-router/release/angular-ui-router.js",
    "bower_components/angular-inflector/dist/angular-inflector.js",
    "bower_components/angular-restmod/dist/angular-restmod.js",

    // bootstrap
    //'bower_components/bootstrap-sass/assets/javascripts/bootstrap/affix.js',
    //'bower_components/bootstrap-sass/assets/javascripts/bootstrap/alert.js',
    //'bower_components/bootstrap-sass/assets/javascripts/bootstrap/button.js',
    //'bower_components/bootstrap-sass/assets/javascripts/bootstrap/carousel.js',
    //'bower_components/bootstrap-sass/assets/javascripts/bootstrap/collapse.js',
    //'bower_components/bootstrap-sass/assets/javascripts/bootstrap/dropdown.js',
    'bower_components/bootstrap-sass/assets/javascripts/bootstrap/modal.js',
    //'bower_components/bootstrap-sass/assets/javascripts/bootstrap/scrollspy.js',
    //'bower_components/bootstrap-sass/assets/javascripts/bootstrap/tab.js',
    //'bower_components/bootstrap-sass/assets/javascripts/bootstrap/transition.js',
    //'bower_components/bootstrap-sass/assets/javascripts/bootstrap/tooltip.js',
    //'bower_components/bootstrap-sass/assets/javascripts/bootstrap/popover.js',

];
var JS_SCRIPTS = [
    'resources/assets/js/common/init.js',
    'resources/assets/js/common/**/*.js',
    'resources/assets/js/app/init.js',
    'resources/assets/js/app/**/*.js',
    'resources/assets/js/users/init.js',
    'resources/assets/js/users/**/*.js',
    'resources/assets/js/**/*.js',
    'resources/assets/js/**/**/*.js',
    'resources/assets/js/*.js'
];

gulp.task('html2js', function () {
    return gulp.src('resources/views/angular/**/*.html')
        .pipe(html2js('angular.js', {
            base: 'resources/views/angular',
            name: 'html'
        }))
        .pipe(gulp.dest('resources/assets/js/'));
});

gulp.task('js:dev', ['html2js'], function () {
    gulp.src(JS)
        .pipe(sourcemaps.init())
        .pipe(concat('vendor.js'), {newLine: ';'})
        .pipe(uglify())
        .pipe(header(banner, {pkg: pkg}))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('public/assets/js/'));

    gulp.src(JS_SCRIPTS)
        .pipe(sourcemaps.init())
        .pipe(concat('main.js'), {newLine: ';'})
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('public/assets/js/'));
});
gulp.task('js:main', ['js:dev'], function () {

    return gulp.src('public/assets/js/main.js')
        .pipe(uglify())
        .pipe(header(banner, {pkg: pkg}))
        .pipe(gulp.dest('public/assets/js/'));
});

gulp.task('sass:dev', function () {
    return gulp.src("resources/assets/sass/app.scss")
        .pipe(sourcemaps.init({debug: true}))
        .pipe(sass({outputStyle: 'expanded'}).on('error', sass.logError))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('public/assets/css/'));
});

gulp.task('sass:main', ['sass:dev'], function () {
    return gulp.src("public/assets/css/app.css")
        .pipe(autoprefixer("last 1 version", "> 1%", "ie 8", "ie 7"))
        .pipe(cssmin({keepSpecialComments: 0}))
        .pipe(header(banner, {pkg: pkg}))
        .pipe(gulp.dest('public/assets/css/'));
});
gulp.task('copy', function () {

});

gulp.task('watch', function () {
    gulp.watch('resources/views/angular/**/*.html', ['js:dev']);
    gulp.watch(JS_SCRIPTS, ['js:dev']);
    gulp.watch(['resources/assets/sass/*.scss', 'resources/assets/sass/**/*.scss'], ['sass:dev']);
    //gulp.watch($paths.watch.copy, ['copy']);
    gulp.watch('gulpfile.js', ['watch']);
});


gulp.task('local', ['js:dev', 'sass:dev', 'copy']);
gulp.task('default', ['js:main', 'sass:main', 'copy']);
gulp.task('run', ['default', 'watch']);