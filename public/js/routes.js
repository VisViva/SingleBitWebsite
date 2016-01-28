angular.module('Routes', []).config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
  $routeProvider
  // Admin
  .when('/admin/authorize', {
    templateUrl: '../views/admin/authorize.html',
    controller: 'AuthorizeController',
    resolve: {
      load : function(Authorization){
        return Authorization.gotoDashboardIfLoggedIn();
      }
    }
  })
  // Resources
  .when('/admin/resources', {
    redirectTo: '/admin/resources/1'
  })
  .when('/admin/resources/:page', {
    templateUrl: '../views/admin/resources.html',
    controller: 'ResourcesController',
    resolve: {
      load : function(Authorization){
        return Authorization.proceedIfLoggedIn();
      }
    }
  })
  // Messages
  .when('/admin/messages', {
    redirectTo: '/admin/messages/1'
  })
  .when('/admin/messages/:page', {
    templateUrl: '../views/admin/messages.html',
    controller: 'MessagesController',
    resolve: {
      load : function(Authorization){
        return Authorization.proceedIfLoggedIn();
      }
    }
  })
  .when('/admin/messages/view/:id', {
    templateUrl: '../views/admin/message.html',
    controller: 'MessageController',
    resolve: {
      load : function(Authorization){
        return Authorization.proceedIfLoggedIn();
      }
    }
  })
  // Publish
  .when('/admin/publish/', {
    templateUrl: '../views/admin/publish.html',
    controller: 'PublishController',
    resolve: {
      load : function(Authorization){
        return Authorization.proceedIfLoggedIn();
      }
    }
  })
  .when('/admin/publish/:id', {
    templateUrl: '../views/admin/publish.html',
    controller: 'PublishController',
    resolve: {
      load : function(Authorization){
        return Authorization.proceedIfLoggedIn();
      }
    }
  })
  // Search
  .when('/search', {
    templateUrl: '../views/search/search.html',
    controller: 'SearchController'
  })
  .when('/search/:text/:page', {
    templateUrl: '../views/search/search.html',
    controller: 'SearchController'
  })
  // Home
  .when('/', {
    templateUrl: '../views/home.html',
    controller: 'HomeController'
  })
  .when('/home', {
    templateUrl: '../views/home.html',
    controller: 'HomeController'
  })
  // Activities
  .when('/feed', {
    redirectTo: '/feed/activity/1'
  })
  .when('/feed/:type/:page', {
    templateUrl: '../views/feed/feed.html',
    controller: 'FeedController'
  })
  // Projects
  .when('/projects', {
    templateUrl: '../views/projects/projects.html',
    controller: 'ProjectsController'
  })
  .when('/projects/type/:type', {
    redirectTo: '/projects/type/:type/1'
  })
  .when('/projects/type/:type/:page', {
    templateUrl: '../views/projects/type.html',
    controller: 'TypeController'
  })
  .when('/view/:id', {
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
  // Not found
  .when('/404', {
    templateUrl: '../views/system/404.html'
  })
  // Otherwise
  .otherwise({
    redirectTo: '/404'
  })

  $locationProvider.html5Mode(true);
}]);
