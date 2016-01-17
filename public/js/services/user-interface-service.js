angular.module('UserInterfaceService', []).factory('UserInterface', ['$rootScope', '$location','$timeout','spinnerService', function($rootScope, $location, $timeout, spinnerService) {

  var userInterface = this;

  userInterface.pages = [];
  userInterface.classes = {persistentAbsolute:[], desktopAbsolute:[], desktopRelative:[], mobilePixels:[]};
  userInterface.selectedPage = 0;
  userInterface.selectedView = 'feed';
  userInterface.zoomInEnabled = false;
  userInterface.mobile = false/*(($(window).height() <= 600) || ($(window).width() <= 600)) ? true : false*/;
  userInterface.scrollbarTemplate = {
    scrollButtons:{
      enable:true
    },
    advanced:{
      autoScrollOnFocus: false,
      updateOnContentResize: true
    }
  }

  // Initialization

  userInterface.initializeService = function(pages, classes, callback){
    userInterface.classes = classes;
    userInterface.pages = pages;

    // Figure out responsiveness

    if (userInterface.mobile == false){
      $(window).load(function(){
        userInterface.initializePrimaryScrollbars();
      });
      $(window).bind('scroll', function(){
        var navHeight = $(window).height() - 100;
        if ($(window).scrollTop() > navHeight)
        $('.navbar-default').addClass('on');
        else $('.navbar-default').removeClass('on');

        for (var i = 0, page = 0; i < userInterface.pages.length; ++i)
        {
          if ($(document).scrollTop() > $('#' + userInterface.pages[i]).offset().top) ++page;
          else break;
        }
        userInterface.selectedPage = page;
        callback();
      });
    }
    else {
      userInterface.switchToPage(0);
      $('.navbar-default').addClass('on');
      $('.zoom-in-start').removeClass('zoom-in-start');
      $('.zoom-in-end').removeClass('zoom-in-end');
    }

    userInterface.calculateDimensions();

    // Custom slider



    // Subscribe to window events

    var resizeTimer;
    $(window).on('resize', function(e){
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(function() {
        userInterface.calculateDimensions();
        userInterface.scrollByPageNumber(userInterface.selectedPage, 300);
      }, 100);
    });
  }

  userInterface.updateService = function(){
    userInterface.calculateDimensions();
    if (userInterface.mobile == false) userInterface.initializeSecondaryScrollbars();
  }

  // Properties

  userInterface.isMobile = function() {
    return userInterface.mobile;
  }

  // Navigation

  userInterface.gotoPage = function(page, view){
    if (page == 1)
    {
      if (userInterface.selectedPage == page)
      {
        if ((userInterface.selectedView != view) || (userInterface.isMobile()))
        {
          userInterface.zoomOut();
          $timeout(function()
          {
            spinnerService.show('viewSpinner');
            $location.path('/' + view);
            userInterface.selectedView = view;
            userInterface.zoomIn();
          }, userInterface.isMobile() ? 0 : 300);
        }
      }
      else
      {
        spinnerService.show('viewSpinner');
        $location.path('/' + view);
        userInterface.selectedView = view;
        if (userInterface.isMobile()) userInterface.switchToPage(page);
        else userInterface.scrollByPageNumber(page);
        $timeout(function(){
          userInterface.zoomIn();
        }, 400);
      }
    } else {
      if (userInterface.selectedPage != page){
        userInterface.zoomOut();
        $timeout(function (){
          $location.path('/' + userInterface.pages[page]);
          if (userInterface.isMobile()) userInterface.switchToPage(page);
          else {
            if (userInterface.selectedPage != page) userInterface.scrollByPageNumber(page);
          }
        }, userInterface.isMobile() ? 0 : 300);
      }
      else {
        $location.path('/' + userInterface.pages[page]);
        if (userInterface.isMobile()) userInterface.switchToPage(page);
        else {
          if (userInterface.selectedPage != page) userInterface.scrollByPageNumber(page);
        }
      }
    }
  }

  userInterface.gotoLocation = function(location){
    userInterface.zoomOut();
    $timeout(function(){
      spinnerService.show('viewSpinner');
      $location.path(location);
      userInterface.updateService();
      if (userInterface.isMobile()) userInterface.scrollByPageNumber(1);
      userInterface.zoomIn();
    }, userInterface.isMobile() ? 0 : 300);
  }

  userInterface.scrollByPageNumber = function(pageNumber, speed){
    if (userInterface.isMobile()) {
      userInterface.switchToPage(pageNumber);
      $('html, body').scrollTop(0);
    } else {
      $('html, body').animate({
        scrollTop: $('#' + userInterface.pages[pageNumber]).offset().top
      }, speed);
    }
  };

  userInterface.scrollByPageName = function(pageName, speed){
    if (userInterface.isMobile()) {
      userInterface.switchToPage(userInterface.pages.indexOf(pageName));
      $('html, body').scrollTop(0);
    } else {
      $('html, body').animate({
        scrollTop: $('#' + pageName).offset().top
      }, speed);
    }
  };

  userInterface.contentLoaded = function(){
    spinnerService.hide('viewSpinner');
    userInterface.updateService();
    userInterface.setZoomEnabled();
    if (userInterface.isMobile()) userInterface.scrollByPageNumber(1);
  }

  // Auxiliary methods

  userInterface.zoomIn = function zoom(){
    if (userInterface.mobile == false){
      if (userInterface.zoomInEnabled == false)
      setTimeout(function(){ zoom(); }, 100);
      else {
        $('.zoom-in-start').removeClass('zoom-in-start').addClass('zoom-in-end');
        userInterface.zoomInEnabled = false;
      }
    }
  }

  userInterface.zoomOut = function(){
    if (userInterface.mobile == false) $('.zoom-in-end').addClass('zoom-in-start').removeClass('zoom-in-end');
  }

  userInterface.setZoomEnabled = function(){
    userInterface.zoomInEnabled = true;
  }

  // Private methods

  userInterface.switchToPage = function(page){
    $('#' + userInterface.pages[0]).css({'display': 'none'});
    $('#' + userInterface.pages[1]).css({'display': 'none'});
    $('#' + userInterface.pages[2]).css({'display': 'none'});
    $('#' + userInterface.pages[3]).css({'display': 'none'});
    $('#' + userInterface.pages[page]).css({'display': ''});
    userInterface.selectedPage = page;
  }

  userInterface.initializePrimaryScrollbars = function(){
    if (userInterface.mobile == false){
      userInterface.scrollbarTemplate.theme = "inset-dark";
      userInterface.scrollbarTemplate.scrollbarPosition = "outside";
      $('.scrollable-dark').mCustomScrollbar(userInterface.scrollbarTemplate);
      userInterface.scrollbarTemplate.scrollbarPosition = "inside";
      $('.scrollable-dark-inside').mCustomScrollbar(userInterface.scrollbarTemplate);
      userInterface.scrollbarTemplate.theme = "inset";
      $('.scrollable-light-inside').mCustomScrollbar(userInterface.scrollbarTemplate);
    }
  };

  userInterface.initializeSecondaryScrollbars = function(){
    if (userInterface.mobile == false){
      userInterface.scrollbarTemplate.theme = "inset-dark";
      userInterface.scrollbarTemplate.scrollbarPosition = "outside";
      $('.scrollable-dark-view').mCustomScrollbar(userInterface.scrollbarTemplate);
      userInterface.scrollbarTemplate.scrollbarPosition = "inside";
      $('.scrollable-dark-inside-view').mCustomScrollbar(userInterface.scrollbarTemplate);
    }
  };

  userInterface.calculateDimensions = function(){
    var heightPercentageMultiplier = $(window).height()/100;
    userInterface.classes.persistentAbsolute.forEach(function(element, index, array){
      $(element).css({"height": heightPercentageMultiplier * parseInt(element.split('-')[1]) + "px"});
      $(element).css({"display": "block"});
      $(element).css({"overflow": "hidden"});
    });
    userInterface.classes.persistentImages.forEach(function(element, index, array){
      $(element).css({"height": heightPercentageMultiplier * parseInt(element.split('-')[1]) + "px"});
      $(element).css({"width": "auto"});
      $(element).css({"overflow": "hidden"});
    });
    if (userInterface.isMobile()){
      userInterface.classes.mobilePixels.forEach(function(element, index, array){
        $(element).css({"height": parseInt(element.split('-')[1]) + "px"});
        $(element).css({"width":"auto"});
      });
    } else {
      userInterface.classes.desktopAbsolute.forEach(function(element, index, array){
        $(element).css({"height": heightPercentageMultiplier * parseInt(element.split('-')[1]) + "px"});
        $(element).css({"display": "block"});
        $(element).css({"overflow": "hidden"});
      });
      userInterface.classes.desktopRelative.forEach(function(element, index, array){
        $(element).css({"height": element.split('-')[1] + "%"});
      });
    }
  }

  return {

    // Initialization

    initializeService : function (pages, classes, callback) {
      userInterface.initializeService(pages, classes, callback);
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
      if (userInterface.isMobile() && (userInterface.selectedPage == 1)) userInterface.scrollByPageNumber(1);
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
    isMobile : function(){
      return userInterface.isMobile();
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
