angular.module("SingleBitApplication", [
  // Additional
  'angularSpinners',
  'ngTagsInput',
  'naif.base64',

  // Angular
  'ngRoute',

  // Routes
  'Routes',

  // Controllers
  'MainCtrl',
  'AuthorizeCtrl',
  'DashboardCtrl',
  'PublishCtrl',
  'HomeCtrl',
  'FeedCtrl',
  'ProjectsCtrl',
  'TypeCtrl',
  'AboutCtrl',
  'ContactCtrl',
  'ViewCtrl',

  // Services
  'UserInterfaceService',
  'AuthorizationService',
  'ResourceService',

  // Directives
  'SummernoteDirective',
  'DateTimePickerDirective',
  'FormatDateDirective',
  'DropdownDirective',
  'ViewItemDirective',

  // Filters
  'DateFilter'
]);
