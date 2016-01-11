var gulp = require('gulp'),
    del = require('del'),
    gp_concat = require('gulp-concat'),
    gp_replace = require('gulp-replace');


var scripts = [
    // Jquery
    'public/libs/jquery/dist/jquery.min.js',
    'public/libs/jquery-mousewheel/jquery.mousewheel.min.js',
    // Bootstrap
    'public/libs/bootstrap/dist/js/bootstrap.min.js',
    // Modernizr
    'public/libs/modernizr/modernizr.custom.js',
    // Smooth scroll
    'public/libs/smooth-scroll/smooth-scroll.js',
    // Malihu custom scrollbar
    'public/libs/malihu-custom-scrollbar-plugin/jquery.mCustomScrollbar.concat.min.js',
    // Angular
    'public/libs/angular/angular.min.js',
    'public/libs/angular-route/angular-route.min.js',

    // Controllers
    'public/js/controllers/main-ctrl.js',
    // Services
    'public/js/services/slider-service.js',
    'public/js/services/user-interface-service.js',
    // Application
    'public/js/app.js',
]

var stylesheets = {
    // Styles
    styles:[
        // Malihu custom scrollbar
        'public/libs/malihu-custom-scrollbar-plugin/jquery.mCustomScrollbar.css',

        // Custom styles
        'public/css/style.css',
        'public/css/responsive.css'
    ],

    // Bootstrap
    bootstrap:'public/libs/bootstrap/dist/css/bootstrap.css',
    // Font awesome
    fontawesome:'public/libs/font-awesome/css/font-awesome.css',
    // Lato fonts
    lato:'public/libs/lato/css/lato.css',
    // Open sans fonts
    opensans:'public/libs/open-sans-fontface/open-sans.css'
}

var fonts = [
    // Bootstrap
    'public/libs/bootstrap/dist/fonts/**/*',
    // Font awesome
    'public/libs/font-awesome/fonts/**/*',
    // Lato
    'public/libs/lato/font/**/*',
    // Open sans
    'public/libs/open-sans-fontface/fonts/**/*'
]

// Low level tasks

gulp.task('styles', ['cleanup'], function(){
    return gulp.src(stylesheets.styles)
        .pipe(gp_replace("url(../img", "url(../../img"))
        .pipe(gp_concat('styles.css'))
        .pipe(gulp.dest('public/dist/css/temp'));
});

gulp.task('bootstrap', ['cleanup'], function(){
    return gulp.src(stylesheets.bootstrap)
        .pipe(gulp.dest('public/dist/css/temp'));
});

gulp.task('fontawesome', ['cleanup'], function(){
    return gulp.src(stylesheets.fontawesome)
        .pipe(gulp.dest('public/dist/css/temp'));
});

gulp.task('lato', ['cleanup'], function(){
    return gulp.src(stylesheets.lato)
        .pipe(gp_replace("../font", "../fonts"))
        .pipe(gulp.dest('public/dist/css/temp'));
});

gulp.task('opensans', ['cleanup'], function(){
    return gulp.src(stylesheets.opensans)
        .pipe(gp_replace("./fonts", "../fonts"))
        .pipe(gulp.dest('public/dist/css/temp'));
});

gulp.task('combine-stylesheets', ['styles', 'bootstrap', 'fontawesome', 'lato', 'opensans'], function(){
    return gulp.src('public/dist/css/temp/*')
        .pipe(gp_concat('stylesheets.css'))
        .pipe(gulp.dest('public/dist/css'));
});

gulp.task('cleanup-temp', ['combine-stylesheets'], function(){
    return del('public/dist/css/temp');
});

// High level tasks

gulp.task('scripts', ['cleanup'], function(){
    return gulp.src(scripts)
        .pipe(gp_concat('scripts.js'))
        .pipe(gulp.dest('public/dist/js'));
});

gulp.task('stylesheets', ['styles', 'bootstrap', 'fontawesome', 'lato', 'opensans', 'combine-stylesheets', 'cleanup-temp']);

gulp.task('fonts', ['cleanup'], function(){
    return gulp.src(fonts)
        .pipe(gulp.dest('public/dist/fonts'));
});

gulp.task('cleanup', function(){
    return del('public/dist/*');
});

// Default task

gulp.task('default', ['cleanup', 'scripts', 'stylesheets', 'fonts']);