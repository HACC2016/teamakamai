var gulp         = require('gulp'),
    concat       = require('gulp-concat'),
    header       = require('gulp-header'),
    uglify       = require('gulp-uglify'),
    sass         = require('gulp-sass'),
    livereload   = require('gulp-livereload'),
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
    'bower_components/materialize/dist/js/materialize.js',
    "bower_components/momentjs/moment.js",
    "bower_components/lodash/dist/lodash.js",
    "bower_components/cookies-js/dist/cookies.js",
    'bower_components/url-to/url-to.js',
    // angular
    "bower_components/angular/angular.js",
    "bower_components/angular-ui-router/release/angular-ui-router.js",
    "bower_components/angular-inflector/dist/angular-inflector.js",
    "bower_components/angular-restmod/dist/angular-restmod.js",
    'bower_components/angular-animate/angular-animate.js',
    'bower_components/plupload/js/plupload.full.min.js',
    'bower_components/angular-plupload/dist/angular-plupload.min.js',
    "bower_components/angular-sanitize/angular-sanitize.js"

];
var JS_SCRIPTS = [
    'resources/assets/js/html.js',
    'resources/assets/js/common/init.js',
    'resources/assets/js/common/**/*.js',
    'resources/assets/js/app/start.js',
    'resources/assets/js/app/**/*.js',
    'resources/assets/js/account/init.js',
    'resources/assets/js/account/**/*.js',
    'resources/assets/js/twilio/start.js',
    'resources/assets/js/twilio/**/*.js',
    'resources/assets/js/users/start.js',
    'resources/assets/js/users/**/*.js',
];

gulp.task('html2js', function () {
    return gulp.src(['resources/assets/js/**/views/*.html', 'resources/assets/js/**/views/**/*.html'])
        .pipe(html2js('html.js', {
            base: 'resources/assets/js',
            name: 'html'
        }))
        .pipe(gulp.dest('resources/assets/js/'));
});
gulp.task('vendors', function(){

    return gulp.src(JS)
        .pipe(sourcemaps.init())
        .pipe(concat('vendor.js'), {newLine: ';'})
        .pipe(uglify())
        .pipe(header(banner, {pkg: pkg}))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('public/assets/js/'));
});


gulp.task('js:dev', function () {

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
gulp.task('watch', function () {
    gulp.watch(['resources/assets/js/**/views/*.html', 'resources/assets/js/**/views/**/*.html'], ['html2js', 'js:dev']);
    gulp.watch(JS_SCRIPTS, ['js:dev']);
    gulp.watch(['resources/assets/sass/*.scss', 'resources/assets/sass/**/*.scss'], ['sass:dev']);

    livereload.listen();

    gulp.watch('public/assets/css/app.css').on('change', livereload.changed);
    gulp.watch('public/assets/js/vendor.js').on('change', livereload.changed);
    gulp.watch('public/assets/js/main.js').on('change', livereload.changed);
});

gulp.task('local', ['html2js', 'js:dev', 'sass:dev']);
gulp.task('default', ['vendors', 'html2js','js:main', 'sass:main']);
gulp.task('run', ['vendors', 'local', 'watch']);