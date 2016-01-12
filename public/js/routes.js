angular.module('Routes', []).config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider, PageNavigation) {
    $routeProvider
        // Projects
        .when('/projects', {
            templateUrl: '../views/projects.html',
            controller: 'ProjectsController'
        })
        // Feed in all other cases
        .otherwise({
            templateUrl: '../views/feed.html',
            controller: 'FeedController'
        });

    $locationProvider.html5Mode(true);
}]);