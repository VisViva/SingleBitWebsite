angular.module('UserInterfaceService', []).factory('UserInterface', ['$location','$timeout','spinnerService', 'Authorization', function($location, $timeout, spinnerService, Authorization) {

  var userInterface = this;

  userInterface.classes = {};
  userInterface.selectedView = 'home';
  userInterface.zoomInEnabled = false;
  userInterface.scrollbarTemplate = {
    scrollButtons:{
      enable: false
    },
    advanced:{
      autoScrollOnFocus: false,
      updateOnContentResize: true
    },
    documentTouchScroll: true,
    alwaysShowScrollbar: true
  }

  // Initialization

  userInterface.initializeService = function(classes){
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
    var location = $location.path().split('/');
    userInterface.selectedView = location[1];

    /*if ((location.length > 2) && (location[1] == 'admin') && (location[2] != 'authorize')){
      Authorization.loggedin().then(function(response){
        if (response.data.success == true){
          $timeout(function(){ userInterface.zoomIn(); }, 500);
          alert(response.data.message);
        } else {
          userInterface.gotoLocation('admin/authorize');
        }
      }, function(){
        alert('Error connecting to the server!');
      });
    } else {
      $timeout(function(){ userInterface.zoomIn(); }, 500);
    }*/

    $timeout(function(){ userInterface.zoomIn(); }, 500);
  }
  userInterface.updateService = function(){
    userInterface.calculateDimensions();
    userInterface.initializeScrollbars();
  };

  // Navigation

  userInterface.gotoLocation = function(location){
    if ($location.path() != '/' + location){
      userInterface.fillNavbar();
      userInterface.zoomOut();
      $timeout(function(){
        spinnerService.show('viewSpinner');
        $location.path('/' + location);
        userInterface.selectedView = location.split('/')[0];
        userInterface.updateService();
        userInterface.zoomIn();
      }, 500);
    }
  };
  userInterface.contentLoaded = function(){
    spinnerService.hide('viewSpinner');
    userInterface.updateService();
    userInterface.setZoomEnabled();
  };

  // Auxiliary methods

  userInterface.zoomIn = function zoom(){
    userInterface.styleNavbar();
    if (userInterface.zoomInEnabled == false)
    setTimeout(function(){ zoom(); }, 100);
    else {
      $('.move-above').removeClass('move-above').addClass('move-center');
      userInterface.zoomInEnabled = false;
    }
  };
  userInterface.zoomOut = function(){
    $('.move-center').addClass('move-below').removeClass('move-center');
    setTimeout(function(){ $('.move-below').removeClass('move-below').addClass('move-above'); }, 500);
  };
  userInterface.setZoomEnabled = function(){
    userInterface.zoomInEnabled = true;
  };
  userInterface.fillNavbar = function(){
    $('.navbar-default').addClass('on');
  };
  userInterface.styleNavbar = function(){
    switch (userInterface.selectedView)
    {
      case 'admin': case 'feed': case 'projects': case 'about': case 'contact':
      {
        $('.navbar-default').addClass('on');
        break;
      }
      case 'home': case '':
      {
        userInterface.selectedView = 'home';
        $('.navbar-default').removeClass('on');
        break;
      }
      default:
      {
        $('.navbar-default').removeClass('on');
        break;
      }
    };
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
    }
  }
}]);
