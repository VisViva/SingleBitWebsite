angular.module('appRoutes', []).config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider, Slider) {
    $routeProvider
        // Feed
        .when('/feed', {
            templateUrl: '../views/feed.html',
            controller: 'FeedController'
        })
        // Projects
        .when('/projects', {
            templateUrl: '../views/projects.html',
            controller: 'ProjectsController'
        });

    $locationProvider.html5Mode(true);
}]);