angular.module('UserInterfaceService', []).factory('UserInterface', ['$rootScope', '$location','$timeout','spinnerService', function($rootScope, $location, $timeout, spinnerService) {

  var userInterface = this;

  userInterface.selectedPage = 0;
  userInterface.selectedView = 'feed';
  userInterface.pages = [];
  userInterface.classes = {persistentAbsolute:[], desktopAbsolute:[], desktopRelative:[], mobilePixels:[]};
  userInterface.zoomInEnabled = false;
  userInterface.mobile = (($(window).height() <= 600) || ($(window).width() <= 600)) ? true : false;
  userInterface.scrollbarTemplate = {
    scrollButtons:{
      enable:true
    },
    advanced:{
      autoScrollOnFocus: false,
      updateOnContentResize: true
    }
  }

  userInterface.switchToPage = function(page){
    $('#' + userInterface.pages[1]).css({'display': 'none'});
    $('#' + userInterface.pages[2]).css({'display': 'none'});
    $('#' + userInterface.pages[3]).css({'display': 'none'});
    $('#' + userInterface.pages[page]).css({'display': ''});
    userInterface.selectedPage = page;
  }

  userInterface.isMobile = function() {
    return userInterface.mobile;
  }

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
        $(element).css({"overflow": "hidden"});
      });
    }else{
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

  userInterface.scrollByPageName = function(pageName, speed){
    if (userInterface.isMobile()) userInterface.switchToPage(userInterface.pages.indexOf(pageName));
    $('html, body').animate({
      scrollTop: $('#' + pageName).offset().top
    }, speed);
  };

  userInterface.scrollByPageNumber = function(pageNumber, speed){
    if (userInterface.isMobile()) userInterface.switchToPage(pageNumber);
    $('html, body').animate({
      scrollTop: $('#' + userInterface.pages[pageNumber]).offset().top
    }, speed);
  };

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

  userInterface.updateService = function(){
    userInterface.calculateDimensions();
    if (userInterface.mobile == false) userInterface.initializeSecondaryScrollbars();
  }

  userInterface.contentLoaded = function(){
    spinnerService.hide('viewSpinner');
    userInterface.updateService();
    userInterface.setZoomEnabled();
  }

  userInterface.setZoomEnabled = function(){
    userInterface.zoomInEnabled = true;
  }

  return {

    // Initialization

    initializeService : function (pages, classes, callback) {
      userInterface.classes = classes;
      userInterface.pages = pages;

      // Figure out responsiveness

      if (userInterface.mobile == false){
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

      $('a.page-scroll').click(function()
      {
        if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
          var target = $(this.hash);
          target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
          if (target.length) {
            $('html,body').animate({
              scrollTop: target.offset().top - 40
            }, 900);
            return false;
          }
        }
      });

      // Subscribe to window events

      var resizeTimer;
      $(window).on('resize', function(e){
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(function() {
          userInterface.calculateDimensions();
          userInterface.scrollByPageNumber(userInterface.selectedPage, 300);
        }, 100);
      });
    },

    updateService : function(){
      userInterface.updateService();
    },

    // Toggling menu

    hideMenu : function(){
      $('.navbar-collapse').collapse('hide');
    },

    // Zooming page

    zoomIn : function(){
      userInterface.zoomIn();
    },

    zoomOut : function(){
      userInterface.zoomOut();
    },

    setZoomEnabled : function(){
      userInterface.setZoomEnabled();
    },

    // Forced scroll

    scrollByPageNumber : function(pageNumber){
      userInterface.scrollByPageNumber(pageNumber, 500);
    },
    scrollByPageName : function(pageName){
      userInterface.scrollByPageName(pageName, 500);
    },

    // Selected page

    getSelectedPage : function(){
      return userInterface.selectedPage;
    },
    setSelectedPage : function(page){
      userInterface.selectedPage = page;
    },

    // Selected view

    getSelectedView : function(){
      return userInterface.selectedView;
    },
    setSelectedView : function(view){
      userInterface.selectedView = view;
    },

    // Navigation

    gotoPage : function(page, view)
    {
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
              if (userInterface.isMobile()) userInterface.scrollByPageNumber(page);
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
            if (userInterface.isMobile()) userInterface.switchToPage(page);
            if ((userInterface.selectedPage != page) || (userInterface.isMobile())) userInterface.scrollByPageNumber(page);
          }, userInterface.isMobile() ? 0 : 300);
        }
        else {
          $location.path('/' + userInterface.pages[page]);
          if (userInterface.isMobile()) userInterface.switchToPage(page);
          if ((userInterface.selectedPage != page) || (userInterface.isMobile())) userInterface.scrollByPageNumber(page);
        }
      }
    },

    gotoLocation : function(location){
      userInterface.zoomOut();
      $timeout(function(){
        spinnerService.show('viewSpinner');
        $location.path(location);
        userInterface.updateService();
        if (userInterface.isMobile()) userInterface.scrollByPageNumber(1);
        userInterface.zoomIn();
      }, userInterface.isMobile() ? 0 : 300);
    },

    contentLoaded : function(){
      userInterface.contentLoaded();
    },

    isMobile : function(){
      return userInterface.isMobile();
    }
  }
}]);
