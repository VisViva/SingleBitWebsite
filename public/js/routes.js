angular.module('Routes', []).config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
  $routeProvider
  // Activities
  .when('/feed', {
    templateUrl: '../views/feed/feed.html',
    controller: 'FeedController'
  })
  .when('/feed/view/:id', {
    templateUrl: '../views/view.html',
    controller: 'ViewController'
  })
  // Projects
  .when('/projects', {
    templateUrl: '../views/projects/projects.html',
    controller: 'ProjectsController'
  })
  .when('/projects/type/:type', {
    templateUrl: '../views/projects/type.html',
    controller: 'TypeController'
  })
  .when('/projects/view/:id', {
    templateUrl: '../views/view.html',
    controller: 'ViewController'
  })
  // Other cases
  .otherwise({
    templateUrl: '../views/empty.html'
  });

  $locationProvider.html5Mode(true);
}]);
