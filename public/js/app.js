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
  'SearchCtrl',
  'AuthorizeCtrl',
  'ResourcesCtrl',
  'MessagesCtrl',
  'MessageCtrl',
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
  'MessageService',
  'CommentService',
  'HistoryService',

  // Directives
  'SummernoteDirective',
  'DateTimePickerDirective',
  'FormatDateDirective',
  'DropdownDirective',
  'ViewItemDirective',
  'SearchPaneDirective',
  'TagListDirective',

  // Filters
  'DateFilter',
  'MessagePreviewFilter',
  'PluralFilter'
]);
