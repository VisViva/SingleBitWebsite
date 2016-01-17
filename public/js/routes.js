angular.module('Routes', []).config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
  $routeProvider
  // Admin
  .when('/admin/authorize', {
    templateUrl: '../views/admin/authorize.html',
    controller: 'AuthorizeController'
  })
  .when('/admin/publish', {
    templateUrl: '../views/admin/publish.html',
    controller: 'PublishController'
  })
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
  // About
  .when('/about', {
    templateUrl: '../views/about.html',
    controller: 'AboutController'
  })
  // Contact
  .when('/contact', {
    templateUrl: '../views/contact.html',
    controller: 'ContactController'
  })
  // Otherwise
  .otherwise({
    templateUrl: '../views/feed/feed.html',
    controller: 'FeedController'
  })

  $locationProvider.html5Mode(true);
}]);
