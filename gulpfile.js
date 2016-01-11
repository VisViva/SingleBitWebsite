var gulp = require('gulp'),
    gp_concat = require('gulp-concat');

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

var stylesheets = [
    // Bootstrap
    'public/libs/bootstrap/dist/css/bootstrap.css',
    // Font awesome
    'public/libs/font-awesome/css/font-awesome.css',
    // Lato fonts
    'public/libs/lato/css/lato.css',
    // Open sans fonts
    'public/libs/open-sans-fontface/open-sans.css',
    // Malihu custom scrollbar
    'public/libs/malihu-custom-scrollbar-plugin/jquery.mCustomScrollbar.css',

    // Custom styles
    'public/css/style.css',
    'public/css/responsive.css'
]

gulp.task('scripts', function(){
    return gulp.src(scripts)
        .pipe(gp_concat('scripts.js'))
        .pipe(gulp.dest('public/deploy'));
});

gulp.task('stylesheets', function(){
    return gulp.src(stylesheets)
        .pipe(gp_concat('stylesheets.css'))
        .pipe(gulp.dest('public/deploy'));
});

gulp.task('default', ['scripts', 'stylesheets']);