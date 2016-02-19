angular.module('UserInterfaceService', []).factory('UserInterface', ['$location','$timeout','spinnerService', 'Authorization', '$rootScope', function($location, $timeout, spinnerService, Authorizationm, $rootScope) {

  var userInterface = this;

  userInterface.classes = {};
  userInterface.selectedView = 'home';
  userInterface.zoomInEnabled = false;
  userInterface.animationsInProgress = false;
  userInterface.scrollbarTemplate = {
    scrollButtons:{
      enable: false
    },
    advanced:{
      autoScrollOnFocus: false,
      updateOnContentResize: true
    },
    documentTouchScroll: true,
    alwaysShowScrollbar: true,
    scrollInertia : 0,
    mouseWheelPixels: 60
  }

  // Initialization

  userInterface.initializeService = function(classes){
    // Respond to explicit history back action

    $rootScope.$on('$locationChangeSuccess', function() {
      var location = $location.path().split('/');
      if (location[1] == ''){
        $location.url('/home');
        userInterface.selectedView = 'home';
      } else {
        userInterface.selectedView = location[1]
      }
    });

    userInterface.classes = classes;
    userInterface.calculateDimensions();

    // Subscribe to window events

    var resizeTimer;
    $(window).on('resize', function(e){
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(function() {
        userInterface.calculateDimensions();
      }, 100);
    });
  };
  userInterface.loadRequestedLocation = function(){
    $timeout(function(){ userInterface.zoomIn(); }, 300);
  }
  userInterface.updateService = function(){
    userInterface.calculateDimensions();
    userInterface.initializeScrollbars();
  };

  // Navigation

  userInterface.changeLocation = function(location){
    if ($location.path() != '/' + location){
      if (userInterface.animationsInProgress == false)
      {
        userInterface.animationsInProgress = true;
        userInterface.zoomOut();
        if (location != 'home') userInterface.fillNavbar();
        $timeout(function(){
          spinnerService.show('viewSpinner');
          $location.url('/' + location);
          $location.path('/' + location);
          userInterface.selectedView = location.split('/')[0];
          userInterface.updateService();
          if (location == 'home') userInterface.emptyNavbar();
          userInterface.zoomIn();
        }, 300);
      }
    }
  };
  userInterface.gotoLocation = function(location){
    if (location.split('/')[0] == 'admin'){
      Authorization.check().then(function(data){
        if (data.data.success == true){
          userInterface.changeLocation(location);
        } else {
          userInterface.changeLocation('admin/authorize');
        }
      });
    } else {
      userInterface.changeLocation(location);
    }
  };
  userInterface.contentLoaded = function(){
    spinnerService.hide('viewSpinner');
    userInterface.updateService();
    userInterface.setZoomEnabled();
  };

  // Auxiliary methods

  userInterface.zoomIn = function zoom(){
    if (userInterface.zoomInEnabled == false)
    setTimeout(function(){ zoom(); }, 100);
    else {
      $('.move-above').removeClass('move-above').addClass('move-center');
      userInterface.zoomInEnabled = false;
      setTimeout(function(){ userInterface.animationsInProgress = false; }, 300);
    }
  };
  userInterface.zoomOut = function(){
    $('.move-center').addClass('move-below').removeClass('move-center');
    setTimeout(function(){ $('.move-below').removeClass('move-below').addClass('move-above'); }, 300);
  };
  userInterface.setZoomEnabled = function(){
    userInterface.zoomInEnabled = true;
  };
  userInterface.fillNavbar = function(){
    $('.navbar-default').addClass('on');
  };
  userInterface.emptyNavbar = function(){
    $('.navbar-default').removeClass('on');
  };

  // Private methods

  userInterface.initializeScrollbars = function(){
    userInterface.scrollbarTemplate.theme = "minimal-dark";
    $('.scrollable-dark').mCustomScrollbar(userInterface.scrollbarTemplate);
    userInterface.scrollbarTemplate.theme = "minimal";
    $('.scrollable-light').mCustomScrollbar(userInterface.scrollbarTemplate);
  };
  userInterface.calculateDimensions = function(){
    var heightPercentageMultiplier = $(window).height()/100;
    userInterface.classes.desktopAbsolute.forEach(function(element, index, array){
      $(element).css({"height": heightPercentageMultiplier * parseInt(element.split('-')[1]) + "px"});
      $(element).css({"display": "block"});
      $(element).css({"overflow": "hidden"});
    });

    // View

    $(".da-view").css({"height": $(window).height() - 50 + "px"});
    $(".da-view").css({"display": "block"});
    $(".da-view").css({"overflow": "hidden"});
    $(".da-view-min").css({"height": $(window).height() - 37 + "px"});
    $(".da-view-min").css({"display": "block"});
    $(".da-view-min").css({"overflow": "hidden"});
    $(".da-view-min-inner").css({"height": $(window).height() - 87 + "px"});
    $(".da-view-min-inner").css({"display": "block"});
    $(".da-view-min-inner").css({"overflow": "hidden"});
  };

  return {

    // Initialization

    initializeService : function(pages, classes){
      userInterface.initializeService(pages, classes);
    },
    loadRequestedLocation : function(){
      userInterface.loadRequestedLocation();
    },
    updateService : function(){
      userInterface.updateService();
    },

    // Navigation

    gotoLocation : function(location){
      userInterface.gotoLocation(location);
    },
    contentLoaded : function(){
      userInterface.contentLoaded();
    },

    // Properties

    getSelectedPage : function(){
      return userInterface.selectedPage;
    },
    setSelectedPage : function(page){
      userInterface.selectedPage = page;
    },
    getSelectedView : function(){
      return userInterface.selectedView;
    },
    setSelectedView : function(view){
      userInterface.selectedView = view;
    },

    // Auxiliary methods

    hideMenu : function(){
      $('.navbar-collapse').collapse('hide');
    },
    zoomIn : function(){
      userInterface.zoomIn();
    },
    zoomOut : function(){
      userInterface.zoomOut();
    },
    setZoomEnabled : function(){
      userInterface.setZoomEnabled();
    },
    fillNavbar : function(){
      userInterface.fillNavbar();
    },
    emptyNavbar : function(){
      userInterface.emptyNavbar();
    }
  }
}]);
