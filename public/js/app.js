angular.module("SingleBitApplication", [
  // Additional
  'angularSpinners',
  'ngTagsInput',

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
  'CommentsCtrl',
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
  'FileUploadService',

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
