var gulp         = require('gulp'),
    concat       = require('gulp-concat'),
    header       = require('gulp-header'),
    uglify       = require('gulp-uglify'),
    sass         = require('gulp-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    cssmin       = require('gulp-cssmin'),
    sourcemaps   = require('gulp-sourcemaps'),
    livereload   = require('gulp-livereload'),
    pkg          = require('./package.json'),
    banner       = [
        '/**',
        ' ** <%= pkg.name %> - <%= pkg.description %>',
        ' ** @author <%= pkg.author %>',
        ' ** @version v<%= pkg.version %>',
        ' **/',
        ''
    ].join("\n");
var JS = [
    'bower_components/jquery/dist/jquery.js',
    'bower_components/Materialize/dist/js/materialize.js',
    'resources/assets/js/*.js', 'resources/assets/js/**/*.js'
];

gulp.task('js:dev', function () {
    return gulp.src(JS)
        .pipe(sourcemaps.init())
        .pipe(concat('main.js'), {newLine: ';'})
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('public/assets/js/'))
        .pipe(livereload());
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
        .pipe(sass({outputStyle: 'expanded'}).on('error', sass.logError) )
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('public/assets/css/'))
        .pipe(livereload());
});

gulp.task('sass:main', ['sass:dev'], function () {
    return gulp.src("public/assets/css/app.css")
        .pipe(autoprefixer("last 1 version", "> 1%", "ie 8", "ie 7"))
        .pipe(cssmin({keepSpecialComments: 0}))
        .pipe(header(banner, {pkg: pkg}))
        .pipe(gulp.dest('public/assets/css/'));
});
gulp.task('copy', function(){

});

gulp.task('watch', function () {
    livereload.listen();
    gulp.watch(['resources/assets/js/*.js', 'resources/assets/js/**/*.js'], ['js:dev']);
    gulp.watch(['resources/assets/sass/*.scss', 'resources/assets/sass/**/*.scss'], ['sass:dev']);
    //gulp.watch($paths.watch.copy, ['copy']);
    gulp.watch(['gulpfile.js'], ['local']);
});


gulp.task('local', ['js:dev', 'sass:dev', 'copy']);
gulp.task('default', ['js:main', 'sass:main', 'copy']);