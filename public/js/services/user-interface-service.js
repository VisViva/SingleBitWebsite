angular.module('UserInterfaceService', []).factory('UserInterface', [function() {

  var userInterface = this;

  userInterface.selectedPage = 0;
  userInterface.selectedView = 'feed';
  userInterface.pages = [];
  userInterface.classes = [];
  userInterface.zoomInEnabled = false;
  userInterface.mobile = (($(window).height() < 600) || ($(window).width() < 600)) ? true : false;

  userInterface.calculateDimensions = function(){
    var heightPercentageMultiplier = $(window).height()/100;
    userInterface.classes.forEach(function(element, index, array)
    {
      $(element).css({"height": heightPercentageMultiplier * parseInt(element.split('-')[2]) + "px"});
      if (element[1] == 'i') $(element).css({"width":"auto"});
      else $(element).css({"display": "block"});
      $(element).css({"overflow": "hidden"});
    });
  }

  userInterface.scrollByPageNumber = function(pageNumber, speed){
    $('html, body').animate({
      scrollTop: $(userInterface.pages[pageNumber]).offset().top
    }, speed);
  };

  userInterface.destroyScrollbars = function(){
    $('.scrollable-light').mCustomScrollbar('destroy');
    $('.scrollable-dark').mCustomScrollbar('destroy');
    $('.scrollable-light-inside').mCustomScrollbar('destroy');
    $('.scrollable-dark-inside').mCustomScrollbar('destroy');
  };

  userInterface.initializePrimaryScrollbars = function(){
    $('.scrollable-dark').mCustomScrollbar({
      theme:"inset-dark",
      scrollbarPosition:"outside",
      scrollButtons:{
        enable:true
      },
      advanced:{
        autoScrollOnFocus: false,
        updateOnContentResize: true
      }
    });

    $('.scrollable-light-inside').mCustomScrollbar({
      theme:"inset",
      scrollbarPosition:"inside",
      scrollButtons:{
        enable:true
      },
      advanced:{
        autoScrollOnFocus: false,
        updateOnContentResize: true
      }
    });

    $('.scrollable-dark-inside').mCustomScrollbar({
      theme:"inset-dark",
      scrollbarPosition:"inside",
      scrollButtons:{
        enable:true
      },
      advanced:{
        autoScrollOnFocus: false,
        updateOnContentResize: true
      }
    });
  };

  userInterface.initializeSecondaryScrollbars = function(){
    $('.scrollable-dark-view').mCustomScrollbar({
      theme:"inset-dark",
      scrollbarPosition:"outside",
      scrollButtons:{
        enable:true
      },
      advanced:{
        autoScrollOnFocus: false,
        updateOnContentResize: true
      }
    });

    $('.scrollable-dark-inside-view').mCustomScrollbar({
      theme:"inset-dark",
      scrollbarPosition:"inside",
      scrollButtons:{
        enable:true
      },
      advanced:{
        autoScrollOnFocus: false,
        updateOnContentResize: true
      }
    });
  };

  return {

    // Initialization

    initializeService : function (pages, classes, callback) {

      userInterface.classes = classes;
      userInterface.pages = pages;
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

      $(window).load(function(){
        userInterface.initializePrimaryScrollbars();
      });

      var resizeTimer;

      $(window).on('resize', function(e){
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(function() {
          userInterface.calculateDimensions();
          userInterface.scrollByPageNumber(userInterface.selectedPage, 300);
        }, 100);
      });

      $(window).bind('scroll', function(){
        var navHeight = $(window).height() - 100;
        if ($(window).scrollTop() > navHeight)
        $('.navbar-default').addClass('on');
        else  $('.navbar-default').removeClass('on');

        for (var i = 0, page = 0; i < userInterface.pages.length; ++i)
        {
          if ($(document).scrollTop() > $(userInterface.pages[i]).offset().top) ++page;
          else break;
        }

        userInterface.selectedPage = page;
        callback();
      });

      $(window).bind('wheel', function(){
        return false;
      });
    },

    updateService : function(){
      userInterface.calculateDimensions();
      userInterface.initializeSecondaryScrollbars();
    },

    // Toggling menu

    hideMenu : function(){
      $('.navbar-collapse').collapse('hide');
    },

    // Zooming page

    zoomIn : function zoom(){
      if (userInterface.zoomInEnabled == false)
      setTimeout(function(){ zoom(); }, 100);
      else {
        $('.zoom-in-start').removeClass('zoom-in-start').addClass('zoom-in-end');
        userInterface.zoomInEnabled = false;
      }
    },

    zoomOut : function(){
      $('.zoom-in-end').addClass('zoom-in-start').removeClass('zoom-in-end');
    },

    setZoomEnabled : function(){
      userInterface.zoomInEnabled = true;
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

    selectedView : userInterface.selectedView
  }
}]);
