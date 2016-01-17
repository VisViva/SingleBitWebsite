angular.module('UserInterfaceService', []).factory('UserInterface', ['$rootScope', '$location','$timeout','spinnerService', function($rootScope, $location, $timeout, spinnerService) {

  var userInterface = this;

  userInterface.pages = [];
  userInterface.classes = {};
  userInterface.selectedPage = 0;
  userInterface.selectedView = 'feed';
  userInterface.zoomInEnabled = false;
  userInterface.scrollbarTemplate = {
    scrollButtons:{
      enable:true
    },
    advanced:{
      autoScrollOnFocus: false,
      updateOnContentResize: true
    },
    documentTouchScroll: true
  }

  // Initialization

  userInterface.initializeService = function(pages, classes){
    userInterface.classes = classes;
    userInterface.pages = pages;
    userInterface.calculateDimensions();

    // Subscribe to window events
    $(window).load(function(){
      userInterface.initializePrimaryScrollbars();
    });
    $(window).bind('wheel', function(){
      return false;
    });
    $(window).bind('scroll', function(){
      var navHeight = $(window).height() - 100;
      if ($(window).scrollTop() > navHeight)
      $('.navbar-default').addClass('on');
      else $('.navbar-default').removeClass('on');
      $timeout(function () {
        for (var i = 0, page = 0; i < userInterface.pages.length; ++i){
          if ($(document).scrollTop() > $('#' + userInterface.pages[i]).offset().top) ++page;
          else break;
        }
        userInterface.selectedPage = page;
      });
    });
    $(document).bind('touchmove', function(event){
      event.preventDefault();
    });
    var resizeTimer;
    $(window).on('resize', function(e){
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(function() {
        userInterface.calculateDimensions();
        userInterface.scrollByPageNumber(userInterface.selectedPage, 300);
      }, 100);
    });
  };
  userInterface.updateService = function(){
    userInterface.calculateDimensions();
    userInterface.initializeSecondaryScrollbars();
  };

  // Navigation

  userInterface.gotoPage = function(page, view){
    if (page == 1)
    {
      if (userInterface.selectedPage == page)
      {
        if (userInterface.selectedView != view)
        {
          userInterface.zoomOut();
          $timeout(function()
          {
            spinnerService.show('viewSpinner');
            $location.path('/' + view);
            userInterface.selectedView = view;
            userInterface.zoomIn();
          }, 300);
        }
      }
      else
      {
        spinnerService.show('viewSpinner');
        $location.path('/' + view);
        userInterface.selectedView = view;
        userInterface.scrollByPageNumber(page);
        $timeout(function(){
          userInterface.zoomIn();
        }, 400);
      }
    } else {
      if (userInterface.selectedPage != page){
        userInterface.zoomOut();
        $timeout(function (){
          $location.path('/' + userInterface.pages[page]);
          if (userInterface.selectedPage != page) userInterface.scrollByPageNumber(page);
        }, 300);
      }
      else {
        $location.path('/' + userInterface.pages[page]);
        if (userInterface.selectedPage != page) userInterface.scrollByPageNumber(page);
      }
    }
  };
  userInterface.gotoLocation = function(location){
    userInterface.zoomOut();
    $timeout(function(){
      spinnerService.show('viewSpinner');
      $location.path(location);
      userInterface.updateService();
      userInterface.zoomIn();
    }, 300);
  };
  userInterface.scrollByPageNumber = function(pageNumber, speed){
    $('html, body').animate({
      scrollTop: $('#' + userInterface.pages[pageNumber]).offset().top
    }, speed);
  };
  userInterface.scrollByPageName = function(pageName, speed){
    $('html, body').animate({
      scrollTop: $('#' + pageName).offset().top
    }, speed);
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
      $('.zoom-in-start').removeClass('zoom-in-start').addClass('zoom-in-end');
      userInterface.zoomInEnabled = false;
    }
  };
  userInterface.zoomOut = function(){
    $('.zoom-in-end').addClass('zoom-in-start').removeClass('zoom-in-end');
  };
  userInterface.setZoomEnabled = function(){
    userInterface.zoomInEnabled = true;
  };

  // Private methods

  userInterface.initializePrimaryScrollbars = function(){
    userInterface.scrollbarTemplate.theme = "inset-dark";
    userInterface.scrollbarTemplate.scrollbarPosition = "outside";
    $('.scrollable-dark').mCustomScrollbar(userInterface.scrollbarTemplate);
    userInterface.scrollbarTemplate.scrollbarPosition = "inside";
    $('.scrollable-dark-inside').mCustomScrollbar(userInterface.scrollbarTemplate);
    userInterface.scrollbarTemplate.theme = "inset";
    $('.scrollable-light-inside').mCustomScrollbar(userInterface.scrollbarTemplate);
  };
  userInterface.initializeSecondaryScrollbars = function(){
    userInterface.scrollbarTemplate.theme = "inset-dark";
    userInterface.scrollbarTemplate.scrollbarPosition = "outside";
    $('.scrollable-dark-view').mCustomScrollbar(userInterface.scrollbarTemplate);
    userInterface.scrollbarTemplate.scrollbarPosition = "inside";
    $('.scrollable-dark-inside-view').mCustomScrollbar(userInterface.scrollbarTemplate);
  };
  userInterface.calculateDimensions = function(){
    var heightPercentageMultiplier = $(window).height()/100;
    userInterface.classes.desktopAbsolute.forEach(function(element, index, array){
      $(element).css({"height": heightPercentageMultiplier * parseInt(element.split('-')[1]) + "px"});
      $(element).css({"display": "block"});
      $(element).css({"overflow": "hidden"});
    });
    userInterface.classes.desktopImages.forEach(function(element, index, array){
      $(element).css({"height": heightPercentageMultiplier * parseInt(element.split('-')[1]) + "px"});
      $(element).css({"width": "auto"});
      $(element).css({"overflow": "hidden"});
    });
    userInterface.classes.desktopRelative.forEach(function(element, index, array){
      $(element).css({"height": element.split('-')[1] + "%"});
    });
  };

  return {

    // Initialization

    initializeService : function (pages, classes) {
      userInterface.initializeService(pages, classes);
    },
    updateService : function(){
      userInterface.updateService();
    },

    // Navigation

    gotoPage : function(page, view){
      userInterface.gotoPage(page, view);
    },
    gotoLocation : function(location){
      userInterface.gotoLocation(location);
    },
    scrollByPageNumber : function(pageNumber){
      userInterface.scrollByPageNumber(pageNumber, 500);
    },
    scrollByPageName : function(pageName){
      userInterface.scrollByPageName(pageName, 500);
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
