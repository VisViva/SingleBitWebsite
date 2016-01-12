var gulp = require('gulp'),
    del = require('del'),
    gp_concat = require('gulp-concat'),
    gp_replace = require('gulp-replace');


var scripts = {
    scriptsSimple : [
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
        'public/libs/angular-spinners/dist/angular-spinners.min.js',

        // Controllers
        'public/js/controllers/main-ctrl.js',
        'public/js/controllers/feed-ctrl.js',
        'public/js/controllers/projects-ctrl.js',
        // Services
        'public/js/services/page-navigation-service.js',
        'public/js/services/user-interface-service.js',
        // Application
        'public/dist/temp/routes.js', // Temporary
        'public/js/app.js'
    ],

    // Routes
    routes: 'public/js/routes.js'
}

var stylesheets = {
    // Styles
    stylesheetsSimple:[
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

// Scripts

gulp.task('routes', ['cleanup-pre'], function(){
    return gulp.src(scripts.routes)
        .pipe(gp_replace("../views", "../../views"))
        .pipe(gulp.dest('public/dist/temp'));
});

gulp.task('combine-scripts', ['routes'], function(){
    return gulp.src(scripts.scriptsSimple)
        .pipe(gp_concat('scripts.js'))
        .pipe(gulp.dest('public/dist/js'));
});

// Stylesheets

gulp.task('stylesheets-simple', ['cleanup-pre'], function(){
    return gulp.src(stylesheets.stylesheetsSimple)
        .pipe(gp_replace("url(../img", "url(../../img"))
        .pipe(gp_concat('stylesheets-simple.css'))
        .pipe(gulp.dest('public/dist/temp'));
});

gulp.task('bootstrap', ['cleanup-pre'], function(){
    return gulp.src(stylesheets.bootstrap)
        .pipe(gulp.dest('public/dist/temp'));
});

gulp.task('fontawesome', ['cleanup-pre'], function(){
    return gulp.src(stylesheets.fontawesome)
        .pipe(gulp.dest('public/dist/temp'));
});

gulp.task('lato', ['cleanup-pre'], function(){
    return gulp.src(stylesheets.lato)
        .pipe(gp_replace("../font", "../fonts"))
        .pipe(gulp.dest('public/dist/temp'));
});

gulp.task('opensans', ['cleanup-pre'], function(){
    return gulp.src(stylesheets.opensans)
        .pipe(gp_replace("./fonts", "../fonts"))
        .pipe(gulp.dest('public/dist/temp'));
});

gulp.task('combine-stylesheets', ['stylesheets-simple', 'bootstrap', 'fontawesome', 'lato', 'opensans'], function(){
    return gulp.src('public/dist/temp/*.css')
        .pipe(gp_concat('stylesheets.css'))
        .pipe(gulp.dest('public/dist/css'));
});

// High level tasks

gulp.task('cleanup-pre', function(){
    return del('public/dist/*');
});

gulp.task('scripts', ['routes', 'combine-scripts']);

gulp.task('stylesheets', ['stylesheets-simple', 'bootstrap', 'fontawesome', 'lato', 'opensans', 'combine-stylesheets']);

gulp.task('fonts', ['cleanup-pre'], function(){
    return gulp.src(fonts)
        .pipe(gulp.dest('public/dist/fonts'));
});

gulp.task('cleanup-post', ['combine-stylesheets', 'combine-scripts'], function(){
    return del('public/dist/temp');
});

// Default task

gulp.task('default', ['cleanup-pre', 'scripts', 'stylesheets', 'fonts', 'cleanup-post']);